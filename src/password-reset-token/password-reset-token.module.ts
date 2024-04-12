import { Module } from '@nestjs/common';
import { PasswordResetTokenService } from './password-reset-token.service';
import { PasswordResetTokenController } from './password-reset-token.controller';
import { PasswordResetToken } from './entities/password-reset-token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PasswordResetToken]),
    UsersModule,
    EmailModule

  ],
  controllers: [PasswordResetTokenController],
  providers: [PasswordResetTokenService],
  exports: [PasswordResetTokenService]
})
export class PasswordResetTokenModule { }
