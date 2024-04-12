import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ResendModule } from 'nestjs-resend';


@Module
  ({
    imports: [
      ConfigModule.forRoot(),
      ResendModule.forRoot({
        apiKey: 're_hN9fiDyy_2z1zfLnMkZW2roNi6BvGsTUG',
      }),
      MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
          auth: {
            user: process.env.user_email_gmail,
            pass: process.env.user_pass_gmail
          }
        },
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: `${process.cwd()}/src/email/templates`,
          adapter: new EjsAdapter(),
          options: {
            strict: true,

          },
        },

      })
    ],
    controllers: [EmailController],
    providers: [EmailService],
    exports: [EmailService]
  })

export class EmailModule { }