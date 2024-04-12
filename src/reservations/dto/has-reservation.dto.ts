import { IsDateString, IsString, Matches } from "class-validator";

export class CreateHasReservationDto {
    @IsString()
    userId: string

    @IsDateString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/)
    currentDate: string
}
