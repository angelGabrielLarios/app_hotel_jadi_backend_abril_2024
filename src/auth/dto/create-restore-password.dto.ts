import { IsString } from "class-validator"

export class CreateRestorePasswordDto {


    @IsString()
    token: string

    @IsString()
    newPassword: string

    @IsString()
    email: string
}
