import { SequelizeModule } from "@nestjs/sequelize";
import { AdminModule } from "./admins/admins.module";
import { Admin } from "./admins/entities/admin.entity";
import { Module } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      models: [Admin],
      autoLoadModels: true,
      synchronize: true,
    }),
    AdminModule,
  ],
})

export class AppModule {}
