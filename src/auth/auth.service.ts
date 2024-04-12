import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateLoginUserDto } from './dto/create-login-user.dto';
import { CreateRegisterUserDto } from './dto/create-register-user.dto';

import { PasswordResetTokenService } from 'src/password-reset-token/password-reset-token.service';


@Injectable()
export class AuthService {

  private readonly numberHashPassword: number = 10
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private passwordResetTokenService: PasswordResetTokenService
  ) { }

  async register(createRegisterUserDto: CreateRegisterUserDto) {



    const userExistWithPhone = await this.usersService.findOneByPhoneNumber({ phoneNumber: createRegisterUserDto.phone })


    if (userExistWithPhone) {
      throw new BadRequestException(`already_phone`, { cause: new Error(), description: '`This phone has already been registered.`' })
    }

    const userExistWithEmail = await this.usersService.findOneByEmail(createRegisterUserDto.email);

    if (userExistWithEmail) {
      throw new BadRequestException(`already_email`, { cause: new Error(), description: 'This email number has already been registered' })
    }

    const hashedPassword = await bcrypt.hash(createRegisterUserDto.password, this.numberHashPassword);

    const newUser = await this.usersService.save({
      firstName: createRegisterUserDto.firstName,
      lastName: createRegisterUserDto.lastName,
      email: createRegisterUserDto.email,
      password: hashedPassword,
      phone: createRegisterUserDto.phone,
      address: createRegisterUserDto.address,

    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...payloadUser } = newUser
    return {
      access_token: await this.jwtService.signAsync(payloadUser),
    };

  }


  async login(createLoginUserDto: CreateLoginUserDto) {

    const user = await this.usersService.findOneByEmail(createLoginUserDto.email);

    if (!user) {
      throw new UnauthorizedException(`error_credentials`, { cause: new Error(), description: `The password or email is incorrect` })
    }

    const isMatchPassword = await bcrypt.compare(createLoginUserDto.password, user.password);

    if (!isMatchPassword) {
      throw new UnauthorizedException(`error_credentials`, { cause: new Error(), description: `The password or email is incorrect` })
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...payloadUser } = user
    return {
      access_token: await this.jwtService.signAsync(payloadUser)
    };
  }


  async recoveryPassword({ email }: { email: string }) {

    const res = await this.passwordResetTokenService.recoveryPassword({ email })

    return res
  }


  async resetPassword({ token, email, newPassword }: { email: string, newPassword: string, token: string }) {
    await this.passwordResetTokenService.validateToken({ token, email })
    const hashedPassword = await bcrypt.hash(newPassword, this.numberHashPassword);
    const user = await this.usersService.restorePassword({ newPassword: hashedPassword, email })

    return user

  }


}
