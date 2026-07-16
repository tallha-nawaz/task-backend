import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TicketsService {
    constructor(private readonly prisma: PrismaService) { }
    getAllTickets() {
        return this.prisma.ticket.findMany();
    }
}
