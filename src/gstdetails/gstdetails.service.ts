/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Gstin_Business, Gstin_filing } from "src/user/typeorm/entities";
import { Repository } from "typeorm";
import { CreateGstdetailDto } from "./dto/create-gstdetail.dto";
import { UpdateGstdetailDto } from "./dto/update-gstdetail.dto";
import { gst_details as Gstdetail } from "./entities/gstdetail.entity";

@Injectable()
export class GstdetailsService {
  constructor(
    @InjectRepository(Gstdetail)
    private gstDetailRepo: Repository<Gstdetail>,
    @InjectRepository(Gstin_Business)
    private gstBusinessDetailRepo: Repository<Gstin_Business>,
    @InjectRepository(Gstin_filing)
    private gstFilingDetailRepo: Repository<Gstin_filing>
  ) {}

  create(createGstdetailDto: CreateGstdetailDto) {
    return "This action adds a new gstdetail";
  }

  async getCompanyBySearch(name, req, res) {
    try {
      const companies = await this.gstDetailRepo
        .createQueryBuilder("companies")
        .select(["companies.id", "companies.lgnm"])
        .orderBy("companies.id", "DESC")
        .maxExecutionTime(10000)
        .where("companies.lgnm LIKE :lgnm", { lgnm: `%${name}%` })
        .limit(100)
        .getMany()
        .catch((err) => {
          console.error(err);
          return res.status(500).json({
            code: -4,
            message: "Data Not Exist",
          });
        });

      return res.json({ companies });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: -5,
        message: "internal server error",
      });
    }
  }

  async findGstCompanyDetails(req, res) {
    try {
      // 284900
      const { id } = req.body;
      console.log("id ==> ", id);
      if (id === undefined || id === null || id === "") {
        return res.status(400).json({
          code: -5,
          message: "feild missing",
        });
      }

      const gst_detail = await this.gstDetailRepo
        .findOneOrFail({
          id: id,
        })
        .catch((err) => {
          console.error("gst_detail", err);
          throw new Error("Error at fetch data");
        });

      // res.json({ gst_detail });
      const { gstin } = gst_detail;
      // console.log(gstin);

      const gst_business_details_uniq = await this.gstBusinessDetailRepo
        .createQueryBuilder("detail")
        .where("detail.gstin = :mygst", { mygst: gstin })
        .getMany()
        .catch((err) => {
          console.error("detail", err);
          throw new Error("Error at fetch data");
        });
      // console.log(gst_business_details_uniq);
      const gst_filing_details = await this.gstFilingDetailRepo
        .createQueryBuilder("filing")
        .where("filing.gstin = :mygst", { mygst: gstin })
        .getMany()
        .catch((err) => {
          console.error("filing", err);
          throw new Error("Error at fetch data");
        });

      return res.json({
        cmp_details: gst_detail,
        cmp_business_details: gst_business_details_uniq,
        cmp_filing_details: gst_filing_details,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: -5,
        message: "internal server error",
      });
    }
  }

  async findAll() {
    console.log("FindAll init");

    try {
      const details = await this.gstDetailRepo
        .createQueryBuilder("gst")
        .select(["gst.id", "gst.lgnm"])
        .cache(true)
        .maxExecutionTime(10000)
        .getMany();
      // ({
      //     cache: {
      //       id: 'gst_search',
      //       milliseconds: 2500000,
      //     },
      //   });
      //   console.log('details get');

      if (!details) {
        throw new BadRequestException("Details Not Found");
      }
      return details;
    } catch (error) {
      console.error(error);

      return;
    }
  }

  async getFilingDetailsFromGST(req, res) {
    try {
      const gstin = req.params.gstin;
      // const gstin = "33ADXPN7352G1Z3";
      const gst_filing_details = await this.gstFilingDetailRepo
        .createQueryBuilder("filing")
        .select(["filing.fy"])
        .where("filing.gstin = :mygst", { mygst: gstin })
        .groupBy("filing.fy")
        .orderBy("filing.fy", "DESC")
        .getMany()
        .catch((err) => {
          console.error("filing", err);
          throw new Error("Error at fetch data");
        });

      return res.json({
        cmp_filing_details: gst_filing_details,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: -5,
        message: "internal server error",
      });
    }
  }

  async getFinacialYearFilingDetails(req, res) {
    try {
      console.log("getFinacialYearFilingDetails ==> ", req.query);

      const fy = req.query.fy;
      const gstin = req.query.gstin;

      // const gstin = "33ADXPN7352G1Z3";
      const gst_filing_details = await this.gstFilingDetailRepo
        .createQueryBuilder("filing")
        .select(["filing.dof", "filing.taxp"])
        .where("filing.fy = :fy AND filing.gstin = :gstin", {
          fy: fy,
          gstin: gstin,
        })
        .groupBy("filing.taxp")
        .orderBy({
          "filing.id": "ASC",
          "filing.dof": "DESC",
        })
        .getMany()
        .catch((err) => {
          console.error("filing", err);
          throw new Error("Error at fetch data");
        });

      return res.json({
        gst_filing_details,
      });
    } catch (error) {
      return res.status(500).json({
        code: -5,
        message: "internal server error",
      });
    }
  }
  findOne(id: number) {
    return `This action returns a #${id} gstdetail`;
  }

  update(id: number, updateGstdetailDto: UpdateGstdetailDto) {
    return `This action updates a #${id} gstdetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} gstdetail`;
  }
}
