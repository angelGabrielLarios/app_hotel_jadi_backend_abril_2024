import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePasswordResetTokenDto } from './dto/create-password-reset-token.dto';
import { UpdatePasswordResetTokenDto } from './dto/update-password-reset-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordResetToken } from './entities/password-reset-token.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import * as crypto from 'crypto';
import { EmailService } from 'src/email/email.service';
@Injectable()
export class PasswordResetTokenService {

  constructor(
    @InjectRepository(PasswordResetToken)
    private passwordResetTokenRepository: Repository<PasswordResetToken>,
    private usersService: UsersService,
    private emailService: EmailService
  ) { }



  async recoveryPassword({ email }: { email: string }) {
    const user = await this.usersService.findOneByEmail(email)
    if (!user) {
      throw new BadRequestException('the_email_address_does_not_exist', { cause: new Error(), description: 'There is no registered user with that email address' })
    }

    /* generate token */
    const token_generated = crypto.randomBytes(20).toString('hex');


    const tokenRecordRef = this.passwordResetTokenRepository.create({
      token: token_generated,
      user: {
        id: user.id
      }
    })

    const tokenRecord = await this.passwordResetTokenRepository.save(tokenRecordRef)

    await this.emailService.sendEmailRecoveryPassWithGmailResend({ token: token_generated, email: user.email })

    return {
      status: true,
      token: tokenRecord.token,
      email: user.email,
      message: 'Send email'
    }
  }

  async validateToken({ email, token }: { email: string, token: string }) {
    const tokenRecord = await this.passwordResetTokenRepository.findOne({
      select: {
        created_at: true,
        id: true,
        token: true,
        user: {
          email: true
        }
      },
      where: {
        user: {
          email: email
        }
      },
      relations: {
        user: true
      },
      order: {
        created_at: "desc",
      },
    })


    if (!tokenRecord) {
      throw new BadRequestException('invalid_token', { cause: new Error(), description: 'invalid token' })
    }

    if (tokenRecord.token !== token) {
      throw new BadRequestException('invalid_token', { cause: new Error(), description: 'invalid token' })
    }

    return tokenRecord
  }



  create(createPasswordResetTokenDto: CreatePasswordResetTokenDto) {
    return 'This action adds a new passwordResetToken';
  }

  findAll() {
    return `This action returns all passwordResetToken`;
  }

  findOne(id: number) {
    return `This action returns a #${id} passwordResetToken`;
  }

  update(id: number, updatePasswordResetTokenDto: UpdatePasswordResetTokenDto) {
    return `This action updates a #${id} passwordResetToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} passwordResetToken`;
  }
}
