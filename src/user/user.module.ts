import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import {
  Gstin_Business,
  Gstin_Detail,
  Gstin_filing,
  User,
} from "./typeorm/entities";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Gstin_Detail]),
    TypeOrmModule.forFeature([Gstin_Business]),
    TypeOrmModule.forFeature([Gstin_filing]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
