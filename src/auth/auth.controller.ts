import {Body, Controller, Get, Post, Request, UseGuards} from "@nestjs/common";
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  @Get('test')
  public test() {
    return true;
  }
  
  @Post('login')
  //@UseGuards(JwtAuthGuard)
  public signIn(@Request() req, @Body() body) {
    return req.body;
  }

  @Post('register')
  //@UseGuards(JwtAuthGuard)
  public register(@Request() req, @Body() body) {
    return "register";
  }
}
