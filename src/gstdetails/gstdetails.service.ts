import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGstdetailDto } from './dto/create-gstdetail.dto';
import { UpdateGstdetailDto } from './dto/update-gstdetail.dto';
import { gst_details as Gstdetail } from './entities/gstdetail.entity';

@Injectable()
export class GstdetailsService {
  constructor(
    @InjectRepository(Gstdetail)
    private gstDetailRepo: Repository<Gstdetail>,
  ) {}
  create(createGstdetailDto: CreateGstdetailDto) {
    return 'This action adds a new gstdetail';
  }

  async getCompanyBySearch(name, req, res) {
    const companies = await this.gstDetailRepo
      .createQueryBuilder('companies')
      .select(['companies.id', 'companies.lgnm'])
      .cache(36288000000) // 7 * 24 *60 *60*1000
      .where('companies.lgnm LIKE :lgnm', { lgnm: `%${name}%` })
      .getManyAndCount();

    return res.json({ companies });
  }

  async findAll() {
    console.log('FindAll init');

    try {
      const details = await this.gstDetailRepo
        .createQueryBuilder('gst')
        .select(['gst.id', 'gst.lgnm'])
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
        throw new BadRequestException('Details Not Found');
      }
      return details;
    } catch (error) {
      console.error(error);

      return;
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
