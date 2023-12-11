import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) { }

  @Get(':id')
  getMyUser(@Param('id') id: string, @Req() req) {
    return this.usersService.getMyUser(id, req);
  }

  @UseGuards(JwtGuard)  
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

}