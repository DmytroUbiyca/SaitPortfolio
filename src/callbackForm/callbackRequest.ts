import { ApiProperty } from "@nestjs/swagger";

export class CallbackRequest {

    @ApiProperty({example: 'Пупкін', description: 'Імя'})
    readonly name: string;  

    @ApiProperty({example: '+38012345678', description: 'Номер телефону'})
    readonly phoneNumber: number;

    @ApiProperty({example: 'post@gmail.com', description: 'Email'})
    readonly email: string;  

    @ApiProperty({example: '300', description: 'Почткова ціна'})
    readonly startPrice: number;  

    @ApiProperty({example: '1000', description: 'Максимальна ціна'})
    readonly endPrice: number; 

    @ApiProperty({example: 'Веб сайт', description: 'Тип проекту'})
    readonly typeOfProject: string | string[];  

    @ApiProperty({example: 'Хочу супер сайт, який взламає будь який сервіс поки я схожу на толчок, далі він повинен генерувати анекдоти, частушки, реп і впрягатись за мене скрізь', description: 'Опис'})
    readonly description: string;  
}