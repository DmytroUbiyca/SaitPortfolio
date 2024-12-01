import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/role-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from '../dto/add-role.dto';
import { BanUserDto } from '../dto/ban-user.dto';
import { get } from 'http';

@ApiTags('Користувачі')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @ApiOperation({summary: 'Створення користувача'})
    @ApiResponse({status: 200, type: User})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto){

        return this.usersService.createUser(userDto);

    }

    @ApiOperation({summary: 'Отримати всіх користувачів'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    getAll(){

        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Видати роль'})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {

        return this.usersService.addRole(dto);
    }

    @ApiOperation({summary: 'Забанити підараса'})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {

        return this.usersService.ban(dto);
    }
}
