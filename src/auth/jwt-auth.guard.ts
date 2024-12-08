import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      // Check if authorization header exists
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException({ message: "Authorization header is missing" });
      }

      const [bearer, token] = authHeader.split(" ");
      
      // Validate the format of the authorization header
      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({ message: "Invalid authorization format" });
      }

      // Verify the JWT token
      const user = this.jwtService.verify(token);
      req.user = user;

      return true;
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException({ message: "User is not authorized" });
    }
  }
}
