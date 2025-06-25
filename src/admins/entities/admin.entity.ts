import { Table, Column, Model, DataType } from "sequelize-typescript";

interface AdminCreationAttrs {
  email: string;
  password: string;
  is_creator?: boolean;
  is_active?: boolean;
}

@Table({ tableName: "admins" })
export class Admin extends Model<Admin, AdminCreationAttrs> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING })
  declare email: string;

  @Column({ type: DataType.STRING })
  declare password: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_creator?: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare is_active?: boolean;
}
