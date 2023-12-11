import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy';
import { PrismaService } from 'prisma/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  providers: [
    AuthService,
    PrismaService,
    LocalStrategy,
    UserService,
    JwtStrategy,
    RefreshJwtStrategy
  ],
  controllers: [AuthController],
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: `${process.env.jwt_secret}`,
      signOptions: { expiresIn: '60s' }
    })],
})
export class AuthModule { }
