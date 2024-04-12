import { IsString } from "class-validator";

export class CreateRecoveryPassByEmailDto {
    @IsString()
    email: string
}