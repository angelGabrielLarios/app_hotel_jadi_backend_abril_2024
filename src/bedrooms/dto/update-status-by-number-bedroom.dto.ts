import { IsEnum, IsNumber } from "class-validator";
import { StatusBedroomEnum } from "../entities/bedroom.entity";

export class UpdateStatusByNumberBedroom {

    @IsNumber()
    num_bedroom: number

    @IsEnum(StatusBedroomEnum)
    status: StatusBedroomEnum
}