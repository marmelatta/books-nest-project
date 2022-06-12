import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}

  @Post('login')
  //@UseGuards(JwtAuthGuard)
  public signIn(@Body() body) {
    return body;
  }

  @Post('register')
  //@UseGuards(JwtAuthGuard)
  public async register(
    /*@Request() req,  -обратиться ко всему что есть*/
    @Body() createUserDto: CreateUserDto,
    @Res() response,
  ) {
    const candidate = await this.userService.findOne(createUserDto.email);
    if (candidate) {
      response.status(HttpStatus.CONFLICT).json({
        message: 'User with this login already exists',
      });
    } else {
      try {
        const user = await this.userService.create(createUserDto);
        response.status(HttpStatus.CREATED).json(user);
      } catch (e) {
        //exception
      }
    }
  }
}
