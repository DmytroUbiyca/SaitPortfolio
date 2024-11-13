import { ApiAcceptedResponse, ApiProperty } from "@nestjs/swagger";
import { Model, Column, DataType, Table, BelongsToMany, ForeignKey } from "sequelize-typescript";
import { User } from "src/users/users/users.model";
import { Role } from "./roles.model";


@Table({ tableName: 'user_roles', createdAt: false,updatedAt:false })
export class UserRoles extends Model<UserRoles> {

    @ApiProperty({example: '1', description: 'Уникальний ідентифікатор'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id!: number;

    @ForeignKey(() => Role)
    @ApiProperty({example: 'ADMIN', description: 'Роль користувача'})
    @Column({ type: DataType.INTEGER})
    roleId!: number;

    @ForeignKey(() => User)
    @ApiProperty({example: 'Адмінчик', description: 'Опис ролі'})
    @Column({ type: DataType.INTEGER})
    userId!: number;

}
