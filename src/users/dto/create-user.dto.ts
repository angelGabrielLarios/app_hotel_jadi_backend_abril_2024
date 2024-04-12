import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {


    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    firstName: string

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    lastName: string

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(200)
    address: string


    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(14)
    phone: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(50)
    password: string
}
