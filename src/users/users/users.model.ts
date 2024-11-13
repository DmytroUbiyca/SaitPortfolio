import { ApiAcceptedResponse, ApiProperty } from "@nestjs/swagger";
import { Model, Column, DataType, Table, BelongsToMany } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальний ідентифікатор'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id!: number;

    @ApiProperty({example: 'user@gmail.com', description: 'Поштова адреса'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email!: string;

    @ApiProperty({example: '123123123', description: 'Пароль'})
    @Column({ type: DataType.STRING, allowNull: false })
    password!: string;

    @ApiProperty({example: 'True', description: 'Забанений чи ні'})
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned!: boolean;

    @ApiProperty({example: 'Єбанат', description: 'Причина бану'})
    @Column({ type: DataType.STRING, allowNull: true })
    banReason!: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
}
