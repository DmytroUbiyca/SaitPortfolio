import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/users/users.model";
import { UsersController } from "./users/users/users.controller";
import { UsersModule } from "./users/users/users.module";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { Post } from "./posts/posts.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { CallbackModule } from "./callbackForm/callback.module";
import { PostsModule } from './posts/posts.module';
import { FilesModule } from './files/files.module';

const connectionEnvSettings = {
  envFilePath: '.env',
  isGlobal: true,
};

let connectionDbSettings : SequelizeModule  = {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: String(process.env.POSTGRES_PASSWORD),
  database: process.env.POSTGRES_DB,
  models: [User,Role,UserRoles,Post],
  autoLoadModels: true,
  synchronize: true
}; 
@Module({
    controllers: [],
    providers: [],
    imports: [
      UsersModule,
      ConfigModule.forRoot(connectionEnvSettings),           
      SequelizeModule.forRoot(connectionDbSettings), 
      RolesModule, 
      AuthModule,
      CallbackModule,
      PostsModule,
      FilesModule
      ],
})

export class AppModule {}