import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";


export class CreateUserDto{

    @ApiProperty({example: 'user@gmail.com', description: 'Поштова адреса'})
    @IsString({message: 'це строка має бути далбайоб'})
    @IsEmail({},{message: "Даун єбать не пиши сюда вонючий ukr net"})
    readonly email: string;

    @ApiProperty({example: '123123123', description: 'Пароль'})
    @IsString({message: 'це тоже кста строка має бути далбайоб'})
    @Length(4,16,{message: 'не обовязково робити пароль в дожину однаковим з 4 см члена спереді або 16 см в жопі'})
    readonly password: string;  



}