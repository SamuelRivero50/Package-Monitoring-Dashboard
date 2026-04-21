// External imports
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

// Internal imports
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { User } from '../users/entities/user.entity';
import type { UserRequestInterface } from '../interfaces/auth/UserRequestInterface';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
  ): Promise<{ access_token: string }> {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req: UserRequestInterface): Promise<User> {
    const user = await this.usersService.findById(req.user.sub);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
