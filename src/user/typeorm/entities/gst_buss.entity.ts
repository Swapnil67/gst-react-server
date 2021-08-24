import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'gst_business_detail', synchronize: false })
export class Gstin_Business {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  adr: string;

  @ApiProperty()
  @Column()
  em: string;

  @ApiProperty()
  @Column()
  mb: string;

  @ApiProperty()
  @Column()
  addr: string;

  @ApiProperty()
  @Column()
  ntr: string;

  @ApiProperty()
  @Column()
  lastUpdatedDate: string;

  @ApiProperty()
  @Column()
  gstin: string;

  @ApiProperty()
  @Column()
  insert_time: Date;

  @ApiProperty()
  @Column()
  update_time: Date;
}
