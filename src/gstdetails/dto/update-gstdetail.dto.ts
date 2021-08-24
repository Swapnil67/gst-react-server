import { PartialType } from '@nestjs/swagger';
import { CreateGstdetailDto } from './create-gstdetail.dto';

export class UpdateGstdetailDto extends PartialType(CreateGstdetailDto) {}
