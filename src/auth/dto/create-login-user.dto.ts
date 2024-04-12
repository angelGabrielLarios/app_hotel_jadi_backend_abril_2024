import { IsString } from "class-validator"

export class CreateLoginUserDto {

    @IsString()
    email: string

    @IsString()
    password: string
}
