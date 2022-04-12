import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.canActivate(context);
  }

  public handleRequest(err, user, info) {
    if (err) {
      throw err;
    }

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
