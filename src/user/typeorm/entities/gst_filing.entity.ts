import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'gstin_filing_detail', synchronize: false })
export class Gstin_filing {
  @Index('id')
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

  @Index()
  @ApiProperty()
  @Column()
  mof: string;

  @Index()
  @ApiProperty()
  @Column()
  dof: string;

  @Index()
  @ApiProperty()
  @Column()
  rtntype: string;

  @Index()
  @ApiProperty()
  @Column()
  arn: string;

  @Index()
  @ApiProperty()
  @Column()
  status: string;

  @Index()
  @ApiProperty()
  @Column()
  gstin: string;

  @Index()
  @ApiProperty()
  @Column()
  insert_time: Date;

  @Index()
  @ApiProperty()
  @Column()
  update_time: Date;
}
