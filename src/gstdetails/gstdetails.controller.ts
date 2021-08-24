import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { GstdetailsService } from './gstdetails.service';
import { CreateGstdetailDto } from './dto/create-gstdetail.dto';
import { UpdateGstdetailDto } from './dto/update-gstdetail.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiTags('GST Details')
@Controller('gstdetails')
export class GstdetailsController {
  constructor(private readonly gstdetailsService: GstdetailsService) {}

  @Post()
  create(@Body() createGstdetailDto: CreateGstdetailDto) {
    return this.gstdetailsService.create(createGstdetailDto);
  }

  @Get()
  findAll() {
    return this.gstdetailsService.findAll();
  }

  @Get('/abc/:id')
  findOne(@Param('id') id: number) {
    return this.gstdetailsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGstdetailDto: UpdateGstdetailDto,
  ) {
    return this.gstdetailsService.update(+id, updateGstdetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gstdetailsService.remove(+id);
  }

  @Get(':name')
  async findSimilar(
    @Param('name') name: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log(name);
    const companies = await this.gstdetailsService.getCompanyBySearch(
      name,
      req,
      res,
    );
    return companies;
  }
}
