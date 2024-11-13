import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/users/users.model";
import { UsersController } from "./users/users/users.controller";
import { UsersModule } from "./users/users/users.module";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';

@Module({
    controllers: [],
    providers: [],
    imports: [UsersModule,
      ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
      }),           
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER,
          password: String(process.env.POSTGRES_PASSWORD),
          database: process.env.POSTGRES_DB,
          models: [User,Role,UserRoles],
          autoLoadModels: true,
          synchronize: true
        }), RolesModule, AuthModule,
      ],
})

export class AppModule {}