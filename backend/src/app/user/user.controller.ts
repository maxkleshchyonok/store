import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/libs/security/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) { }

  @Get(':id')
  getMyUser(@Param('id') id: string) {
    return this.usersService.getMyUser(id);
  }

  @UseGuards(JwtGuard)  
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

}