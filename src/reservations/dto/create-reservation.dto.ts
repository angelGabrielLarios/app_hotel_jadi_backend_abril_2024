import { IsDateString, IsString, Matches } from "class-validator";

export class CreateReservationDto {
    @IsDateString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/)
    check_in_date: string;

    @IsDateString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/)
    check_out_date: string;


    @IsString()
    userId: string

    @IsString()
    typeBedroom: string
}
