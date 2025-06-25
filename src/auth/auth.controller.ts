import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { SignupAdminDto } from "./dto/signup-admin.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("admin/signup")
  signup(@Body() dto: SignupAdminDto) {
    return this.authService.signup(dto.email, dto.password);
  }

  @Post("admin/login")
  login(@Body() dto: LoginDto) {
    return this.authService
      .validate(dto.email, dto.password)
      .then((admin) => this.authService.login(admin));
  }

  @Post("admin/refresh")
  refresh(@Body("token") token: string) {
    return this.authService.refresh(token);
  }
}
