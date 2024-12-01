import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { CanActivate,ExecutionContext,HttpException,HttpStatus,Injectable,UnauthorizedException,} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles, ROLES_KEY } from "./role-auth.decorator";
import { Role } from "src/roles/roles.model";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService,
              private reflector:  Reflector
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException({ message: "Authorization header is missing" });
      }

      const [bearer, token] = authHeader.split(" ");
      const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY,[
        context.getHandler(),
        context.getClass(),
    ])
    if(!requiredRoles){
        return true;
    }
      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({ message: "Invalid authorization format" });
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      return user.roles.some(role => requiredRoles.include(role.value));

    } catch (e) {
      console.error(e);
      throw new HttpException({ message: "Нет доступа" },HttpStatus.FORBIDDEN);
    }
  }
}
