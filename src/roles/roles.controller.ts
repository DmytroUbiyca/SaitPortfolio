import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { dot } from 'node:test/reporters';
import { CreateRoleDto } from './Dto/create-role.dto';

@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService){}

    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }
    @Get('/:value')
    getByValue(@Param('value') value: string){
        return this.roleService.getRoleByValue(value);
    }
}
