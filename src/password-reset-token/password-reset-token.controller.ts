import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PasswordResetTokenService } from './password-reset-token.service';
import { CreatePasswordResetTokenDto } from './dto/create-password-reset-token.dto';
import { UpdatePasswordResetTokenDto } from './dto/update-password-reset-token.dto';

@Controller('password-reset-token')
export class PasswordResetTokenController {
  constructor(private readonly passwordResetTokenService: PasswordResetTokenService) { }

  @Post()
  create(@Body() createPasswordResetTokenDto: CreatePasswordResetTokenDto) {
    return this.passwordResetTokenService.create(createPasswordResetTokenDto);
  }
  @Post('recovery-password')
  recoveryPassword(@Body() { email }: { email: string }) {
    return this.passwordResetTokenService.recoveryPassword({ email })
  }

  @Post('validate-token')
  validateToken(@Body() { email, token }: { email: string, token: string }) {

    return this.passwordResetTokenService.validateToken({ email, token })
  }


  @Get()
  findAll() {
    return this.passwordResetTokenService.findAll();
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePasswordResetTokenDto: UpdatePasswordResetTokenDto) {
    return this.passwordResetTokenService.update(+id, updatePasswordResetTokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passwordResetTokenService.remove(+id);
  }
}
