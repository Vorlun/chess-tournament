import { IsEmail, IsString, MinLength, IsBoolean } from "class-validator";

export class CreateAdminDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsBoolean()
  is_creator: boolean;

  @IsBoolean()
  is_active: boolean;
}
