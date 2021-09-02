import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'gst_detail', synchronize: false })
export class Gstin_Detail {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @ApiProperty()
  @Column()
  nba: string;

  @ApiProperty()
  @Column()
  mandatedeInvoice: string;

  @ApiProperty()
  @Column()
  aggreTurnOverFY: string;

  @Index()
  @ApiProperty()
  @Column()
  lgnm: string;

  @ApiProperty()
  @Column()
  dty: string;

  @ApiProperty()
  @Column()
  aggreTurnOver: string;

  @ApiProperty()
  @Column()
  cxdt: string;

  @Index()
  @ApiProperty()
  @Column()
  gstin: string;

  @ApiProperty()
  @Column()
  gtiFy: string;

  @ApiProperty()
  @Column()
  cmpRt: string;

  @ApiProperty()
  @Column()
  rgdt: string;

  @ApiProperty()
  @Column()
  ctb: string;

  @ApiProperty()
  @Column()
  sts: string;

  @ApiProperty()
  @Column()
  tradeNam: string;

  @ApiProperty()
  @Column()
  isFieldVisitConducted: string;

  @ApiProperty()
  @Column()
  ctj: string;

  @ApiProperty()
  @Column()
  percentTaxInCashFY: string;

  @ApiProperty()
  @Column()
  percentTaxInCash: string;

  @ApiProperty()
  @Column()
  compDetl: string;

  @ApiProperty()
  @Column()
  gti: string;

  @ApiProperty()
  @Column()
  adhrVFlag: string;

  @ApiProperty()
  @Column()
  ekycVFlag: string;

  @ApiProperty()
  @Column()
  stj: string;

  @ApiProperty()
  @Column()
  mbr: string;

  @ApiProperty()
  @Column()
  insert_time: Date;

  @ApiProperty()
  @Column()
  update_time: Date;
}
