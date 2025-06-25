import { Injectable, NotFoundException } from "@nestjs/common";
import { Admin } from "./entities/admin.entity";

@Injectable()
export class AdminService {
  async findAll() {
    return Admin.findAll();
  }

  async findOne(id: number) {
    const admin = await Admin.findByPk(id);
    if (!admin) throw new NotFoundException("Admin not found");
    return admin;
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    await admin.destroy();
    return { message: "Deleted" };
  }
}
