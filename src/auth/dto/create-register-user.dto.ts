import { IsString } from "class-validator"

export class CreateRegisterUserDto {

    @IsString()
    firstName: string

    @IsString()
    lastName: string

    @IsString()
    address: string

    @IsString()
    email: string

    @IsString()
    phone: string

    @IsString()
    password: string
}
