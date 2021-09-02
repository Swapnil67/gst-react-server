/* eslint-disable prettier/prettier */
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
} from "@nestjs/common";
import { GstdetailsService } from "./gstdetails.service";
import { CreateGstdetailDto } from "./dto/create-gstdetail.dto";
import { UpdateGstdetailDto } from "./dto/update-gstdetail.dto";
import { ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";

@ApiTags("GST Details")
@Controller("gstdetails")
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

  @Get("/abc/:id")
  findOne(@Param("id") id: number) {
    return this.gstdetailsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateGstdetailDto: UpdateGstdetailDto
  ) {
    return this.gstdetailsService.update(+id, updateGstdetailDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.gstdetailsService.remove(+id);
  }

  @Post("/company")
  async getCompanyGst(@Req() req: Request, @Res() res: Response) {
    const response = await this.gstdetailsService.findGstCompanyDetails(
      req,
      res
    );

    return response;
  }

  @Get(":name")
  async findSimilar(
    @Param("name") name: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    console.log(name);
    const companies = await this.gstdetailsService.getCompanyBySearch(
      name,
      req,
      res
    );
    return companies;
  }

  @Get("/filing/fy")
  async findGSTFilingByFY(@Req() req: Request, @Res() res: Response) {
    const data = await this.gstdetailsService.getFinacialYearFilingDetails(
      req,
      res
    );
    return data;
  }

  @Get("/filing/fy/full")
  async findDetailsOf_Filing_FinacialYear_ByGST(@Req() req: Request, @Res() res: Response) {
    const data = await this.gstdetailsService.getDetailsOf_Filing_FinacialYear_ByGST(
      req,
      res
    );
    return data;
  }
  
  @Get("/filing/:gstin")
  async findGSTFiling(@Req() req: Request, @Res() res: Response) {
    const data = await this.gstdetailsService.getFilingDetailsFromGST(req, res);
    return data;
  }
}
