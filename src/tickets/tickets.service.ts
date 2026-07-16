import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
    constructor(private readonly prisma: PrismaService) {}

    getAllTickets(opts?: { page?: number; limit?: number; status?: string; priority?: string; search?: string }) {
        const page = opts?.page && opts.page > 0 ? opts.page : 1;
        const limit = opts?.limit && opts.limit > 0 ? opts.limit : 10;
        const take = limit;
        const skip = (page - 1) * limit;
        const where: any = {};
        if (opts?.status) where.status = opts.status;
        if (opts?.priority) where.priority = opts.priority;
        const search = opts?.search?.trim();
        if (search) {
            where.OR = [
                { title: { contains: search } },
                { customer: { is: { firstName: { contains: search } } } },
                { customer: { is: { lastName: { contains: search } } } },
            ];
        }
        return this.prisma.ticket.findMany({
            where: Object.keys(where).length ? where : undefined,
            orderBy: { createdAt: 'desc' },
            take,
            skip,
        });
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
