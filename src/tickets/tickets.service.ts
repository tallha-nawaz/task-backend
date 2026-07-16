import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
    constructor(private readonly prisma: PrismaService) {}

    getAllTickets() {
        return this.prisma.ticket.findMany();
    }

    getTicketById(id: number) {
        return this.prisma.ticket.findUnique({ where: { id } });
    }

    createTicket(dto: CreateTicketDto) {
        try {
            return this.prisma.ticket.create({ data: dto as any });
        } catch (error: any) {
            if (error?.code === 'P2002') throw new ConflictException('Unique constraint failed');
            throw error;
        }
    }

    replaceTicket(id: number, dto: CreateTicketDto) {
        try {
            return this.prisma.ticket.update({ where: { id }, data: dto as any });
        } catch (error: any) {
            if (error?.code === 'P2025') throw new NotFoundException('Ticket not found');
            throw error;
        }
    }

    updateTicket(id: number, dto: UpdateTicketDto) {
        try {
            return this.prisma.ticket.update({ where: { id }, data: dto as any });
        } catch (error: any) {
            if (error?.code === 'P2025') throw new NotFoundException('Ticket not found');
            throw error;
        }
    }

    deleteTicket(id: number) {
        try {
            return this.prisma.ticket.delete({ where: { id } });
        } catch (error: any) {
            if (error?.code === 'P2025') throw new NotFoundException('Ticket not found');
            throw error;
        }
    }
}
