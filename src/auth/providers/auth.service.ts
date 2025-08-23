import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from './token.service';
import { SignInDto } from '../dto/signIn.dto';
import { UsersService } from 'src/users/providers/users.service';
import { BcryptService } from './bcrypt.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService,
    private readonly bcryptService: BcryptService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOneByEmail(signInDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await this.bcryptService.compare(
      signInDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.tokenService.signIn(user);
  }

  async signUp(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await this.bcryptService.hash(
        createUserDto.password,
      );
      createUserDto.password = hashedPassword;
      return await this.usersService.createUser(createUserDto);
    } catch {
      throw new UnauthorizedException('Error while creating user');
    }
  }

  async refreshToken(refresh: string) {
    const access = await this.tokenService.refreshToken(refresh);
    return { access };
  }
}
