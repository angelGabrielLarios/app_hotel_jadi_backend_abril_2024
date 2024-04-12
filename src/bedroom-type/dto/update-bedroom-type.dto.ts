import { PartialType } from '@nestjs/mapped-types';
import { CreateBedroomTypeDto } from './create-bedroom-type.dto';

export class UpdateBedroomTypeDto extends PartialType(CreateBedroomTypeDto) {}
