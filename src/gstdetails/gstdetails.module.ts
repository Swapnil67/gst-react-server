import { Module } from '@nestjs/common';
import { GstdetailsService } from './gstdetails.service';
import { GstdetailsController } from './gstdetails.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { gst_details as Gstdetail } from './entities/gstdetail.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Gstdetail])],
  controllers: [GstdetailsController],
  providers: [GstdetailsService]
})
export class GstdetailsModule {}
    