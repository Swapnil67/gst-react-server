import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { entities } from './user/typeorm/entities';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

let envFilePath = '.env.development';
console.log(`Running in ${process.env.ENVIRONMENT} MODE`);

if(process.env.ENVIRONMENT === 'PRODUCTION'){
  envFilePath = '.env.production';
}else if (process.env.ENVIRONMENT === 'TEST') {
  envFilePath = '.env.testing';
}

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath }),
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.MYSQL_DB_HOST,
      port: Number.parseInt(process.env.MYSQL_DB_PORT),
      username: process.env.MYSQL_DB_USER,
      password: process.env.MYSQL_DB_PASS,
      database: process.env.MYSQL_DB_NAME,
      entities,
      synchronize: true,
    }), 
  ],

})
export class AppModule {}
