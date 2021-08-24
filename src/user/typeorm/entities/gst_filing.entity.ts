import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'gstin_filing_detail', synchronize: false })
export class Gstin_filing {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  fy: string;

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
