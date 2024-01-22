import { Module } from '@nestjs/common';
import { PrismaService } from './prismaService';

@Module({
  imports: [],
  providers: [PrismaService],
  controllers: [],
})
export class AppModule {}
