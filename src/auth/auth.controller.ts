import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags()
@Controller('auth')
export class AuthController {

        constructor(private authService: AuthService){

        }
        @Post('/login')
        login(@Body() userDto: CreateUserDto){
            return this.authService.login(userDto)

        }

        @Post('/registration')
        registaration(@Body() userDto: CreateUserDto){

            return this.authService.registaration(userDto)

        }
        



}
