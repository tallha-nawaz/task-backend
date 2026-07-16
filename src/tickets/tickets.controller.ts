import { Controller, Get, Post, Put, Patch, Delete, Param, Body, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    @Get()
    @ApiOperation({ summary: 'Get all tickets' })
    @ApiResponse({ status: 200, description: 'Returns list of tickets' })
    getAllTickets() {
        return this.ticketsService.getAllTickets();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a ticket by ID' })
    @ApiResponse({ status: 200, description: 'Ticket found' })
    @ApiNotFoundResponse({ description: 'Ticket not found' })
    async getTicketById(@Param('id', ParseIntPipe) id: number) {
        const ticket = await this.ticketsService.getTicketById(id);
        if (!ticket) throw new NotFoundException('Ticket not found');
        return ticket;
    }

    @Post()
    @ApiOperation({ summary: 'Create a new ticket' })
    @ApiCreatedResponse({ description: 'Ticket created successfully' })
    createTicket(@Body() dto: CreateTicketDto) {
        return this.ticketsService.createTicket(dto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Replace an existing ticket' })
    @ApiResponse({ status: 200, description: 'Ticket replaced successfully' })
    @ApiNotFoundResponse({ description: 'Ticket not found' })
    replaceTicket(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateTicketDto) {
        return this.ticketsService.replaceTicket(id, dto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a ticket partially' })
    @ApiResponse({ status: 200, description: 'Ticket updated successfully' })
    @ApiNotFoundResponse({ description: 'Ticket not found' })
    updateTicket(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTicketDto) {
        return this.ticketsService.updateTicket(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a ticket' })
    @ApiResponse({ status: 200, description: 'Ticket deleted successfully' })
    @ApiNotFoundResponse({ description: 'Ticket not found' })
    deleteTicket(@Param('id', ParseIntPipe) id: number) {
        return this.ticketsService.deleteTicket(id);
    }
}
