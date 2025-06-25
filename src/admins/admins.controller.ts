import { Controller, Get, Param, Delete, UseGuards } from "@nestjs/common";
import { RolesGuard } from "../auth/guards/roles.guard";
import { AuthGuard } from "../auth/guards/auth.guard";
import { AdminService } from "./admins.service";
import { Roles } from "../common/decorators/roles.decorator";

@Controller("admins")
@UseGuards(AuthGuard, RolesGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  @Roles("super_admin")
  findAll() {
    return this.adminService.findAll();
  }

  @Get(":id")
  @Roles("admin", "super_admin")
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @Delete(":id")
  @Roles("super_admin")
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }
}
