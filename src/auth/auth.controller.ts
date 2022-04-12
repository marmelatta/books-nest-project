import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  @Post('passport/signin')
  @UseGuards(JwtAuthGuard)
  public signIn(@Request() req, @Body() body) {
    return req.user;
  }
}
