import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsModule } from './tickets/tickets.module';
import { PrismaModule } from './prisma/prisma.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [TicketsModule, PrismaModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
