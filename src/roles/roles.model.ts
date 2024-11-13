import { ApiAcceptedResponse, ApiProperty } from "@nestjs/swagger";
import { Model, Column, DataType, Table, BelongsToMany } from "sequelize-typescript";
import { User } from "src/users/users/users.model";
import { UserRoles } from "./user-roles.model";

interface RolesCreationAttrs {
  value: string;
  password: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RolesCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальний ідентифікатор'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id!: number;

    @ApiProperty({example: 'ADMIN', description: 'Роль користувача'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    value!: string;

    @ApiProperty({example: 'Адмінчик', description: 'Опис ролі'})
    @Column({ type: DataType.STRING, allowNull: false })
    description!: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: User[];
   
}
