import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;
  
  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  password: string;
  
  @Column()
  token: string;

  @Column({ nullable: true })
  @Exclude()
  public currentHashedRefreshToken?: string;

}
