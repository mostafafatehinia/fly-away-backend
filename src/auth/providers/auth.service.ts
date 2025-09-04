import { BadRequestException, Injectable } from '@nestjs/common';
import { TokenService } from './token.service';
import { SignInDto } from '../dto/signIn.dto';
import { UserService } from 'src/user/providers/user.service';
import { BcryptService } from './bcrypt.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly UserService: UserService,
    private readonly bcryptService: BcryptService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.UserService.findOneByEmail(signInDto.email);
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isPasswordValid = await this.bcryptService.compare(
      signInDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }

    return this.tokenService.signIn(user);
  }

  async signUp(createUserDto: CreateUserDto) {
    const hashedPassword = await this.bcryptService.hash(
      createUserDto.password,
    );
    createUserDto.password = hashedPassword;
    return this.UserService.createUser(createUserDto);
  }

  async refreshToken(refresh: string) {
    const access = await this.tokenService.refreshToken(refresh);
    return { access };
  }
}
