import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'gstin_filing_detail', synchronize: false })
export class Gstin_filing {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @ApiProperty()
  @Column()
  fy: string;

  @Index()
  @ApiProperty()
  @Column()
  taxp: string;

  @ApiProperty()
  @Column()
  mof: string;

  @ApiProperty()
  @Column()
  dof: string;

  @ApiProperty()
  @Column()
  rtntype: string;

  @ApiProperty()
  @Column()
  arn: string;

  @ApiProperty()
  @Column()
  status: string;

  @Index()
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
