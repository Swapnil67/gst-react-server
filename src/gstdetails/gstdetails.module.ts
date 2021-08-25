import { Module } from '@nestjs/common';
import { GstdetailsService } from './gstdetails.service';
import { GstdetailsController } from './gstdetails.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { gst_details as Gstdetail } from './entities/gstdetail.entity';
import { Gstin_Business, Gstin_filing } from 'src/user/typeorm/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gstdetail]),
    TypeOrmModule.forFeature([Gstin_Business]),
    TypeOrmModule.forFeature([Gstin_filing]),
  ],
  controllers: [GstdetailsController],
  providers: [GstdetailsService],
})
export class GstdetailsModule {}
