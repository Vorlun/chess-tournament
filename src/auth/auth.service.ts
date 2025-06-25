import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Admin } from "../admins/entities/admin.entity";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signup(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ email, password: hashed });
    return this.login(admin);
  }

  async validate(email: string, password: string) {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return admin;
  }

  async login(admin: Admin) {
    const payload = {
      sub: admin.id,
      email: admin.email,
      role: admin.is_creator ? "super_admin" : "admin",
    };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign(payload, { expiresIn: "30d" });
    return { access_token, refresh_token };
  }

  async refresh(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const admin = await Admin.findByPk(payload.sub);
      if (!admin) throw new UnauthorizedException();
      return this.login(admin);
    } catch {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }
}
