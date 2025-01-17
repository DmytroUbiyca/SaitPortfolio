import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users/users.service';
import * as bcrypt from 'bcrypt';
import { IsEmail } from 'sequelize-typescript';
import { User } from 'src/users/users/users.model';


@Injectable()
export class AuthService {
    
        constructor(private userService: UsersService,
                    private jwtService: JwtService
        ){}

        async login(userDto: CreateUserDto) {
            const user = await this.validateUser(userDto);      
            return this.generateToken(user);
        }
        
        
        
        
        async registaration(userDto: CreateUserDto){

            const candinate = await this.userService.getUserByEmail(userDto.email);

            if(candinate)
            {
                throw new HttpException('Користувач даун з таким email уже існує', HttpStatus.BAD_REQUEST)
            }

            const hashPassword = await bcrypt.hash(userDto.password, 5 )

            const user = await this.userService.createUser({...userDto, password: hashPassword})

            return this.generateToken(user)

        }
        
        async generateToken(user: User){

            const payload = {email: user.email,id: user.id, roles: user.roles}

            return{
                token: this.jwtService.sign(payload)
            }
        }

        private async validateUser(userDto: CreateUserDto): Promise<User> {
            
            const user = await this.userService.getUserByEmail(userDto.email);
   
            if (!user) {
                throw new UnauthorizedException({ message: 'Некоректний email або пароль' });
            }

            const passwordEquals = await bcrypt.compare(userDto.password, user.password);

            if (!passwordEquals) {
                throw new UnauthorizedException({ message: 'Некоректний email або пароль' });
            }

            return user;
        }

}
