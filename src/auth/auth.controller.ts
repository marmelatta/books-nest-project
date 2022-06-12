import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}

  @Post('login')
  //@UseGuards(JwtAuthGuard)
  public signIn(@Request() req, @Body() body) {
    return req.body;
  }

  @Post('register')
  //@UseGuards(JwtAuthGuard)
  public register(/*@Request() req,*/ @Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
