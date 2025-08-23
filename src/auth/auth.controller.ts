import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dto/signIn.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { ApiOperation, ApiResponse, OmitType } from '@nestjs/swagger';
import { SignInResponse } from './interface/signIn.response.interface';
import { UserResponse } from 'src/users/interface/createUser.response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Sign in user',
    description: 'Sign in a user to it`s own account',
  })
  @ApiResponse({
    type: SignInResponse,
    status: HttpStatus.OK,
    description: 'Successfuly signed in',
  })
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @ApiOperation({
    summary: 'Sign up user',
    description: 'Sign up a user and create an account',
  })
  @ApiResponse({
    type: UserResponse,
    status: HttpStatus.CREATED,
    description: 'Successfuly signed up',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('sign-up')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @ApiOperation({
    summary: 'Refresh token',
    description: 'Refresh user token based on given access token',
  })
  @ApiResponse({
    type: OmitType(SignInResponse, ['refresh'] as const),
    status: HttpStatus.OK,
    description: 'Successfuly refreshed token',
  })
  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refresh);
  }
}
