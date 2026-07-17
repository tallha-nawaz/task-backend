import { Controller, Get, Post, Put, Patch, Delete, Param, Body, ParseIntPipe, NotFoundException, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiQuery } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CreateCustomerDto,UpdateCustomerDto } from './dto/create-customer.dto'
@ApiTags('customers')
@Controller('customers')
export class CustomerController {
	constructor(private readonly customerService: CustomerService) {}

	@Get()
	@ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (starts at 1)', example: 1 })
	@ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page', example: 10 })
	@ApiQuery({ name: 'search', required: false, type: String, description: 'Search by customer name or email', example: 'alice@example.com' })
	@ApiOperation({ summary: 'Get all customers' })
	@ApiResponse({ status: 200, description: 'Returns list of customers' })
	getAll(
		@Query('page') page = '1',
		@Query('limit') limit = '10',
		@Query('search') search?: string,
	) {
		const p = parseInt(page as any, 10) || 1;
		const l = Math.min(parseInt(limit as any, 10) || 10, 100);
		return this.customerService.getAll({ page: p, limit: l, search });
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get a customer by ID' })
	@ApiResponse({ status: 200, description: 'Customer found' })
	@ApiNotFoundResponse({ description: 'Customer not found' })
	async getById(@Param('id', ParseIntPipe) id: number) {
		const customer = await this.customerService.getById(id);
		if (!customer) throw new NotFoundException('Customer not found');
		return customer;
	}

	@Post()
	@ApiOperation({ summary: 'Create a new customer' })
	@ApiCreatedResponse({ description: 'Customer created successfully' })
	create(@Body() dto: CreateCustomerDto) {
		return this.customerService.create(dto);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Replace an existing customer' })
	@ApiResponse({ status: 200, description: 'Customer replaced successfully' })
	@ApiNotFoundResponse({ description: 'Customer not found' })
	replace(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateCustomerDto) {
		return this.customerService.replace(id, dto);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update a customer partially' })
	@ApiResponse({ status: 200, description: 'Customer updated successfully' })
	@ApiNotFoundResponse({ description: 'Customer not found' })
	update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCustomerDto) {
		return this.customerService.update(id, dto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a customer' })
	@ApiResponse({ status: 200, description: 'Customer deleted successfully' })
	@ApiNotFoundResponse({ description: 'Customer not found' })
	delete(@Param('id', ParseIntPipe) id: number) {
		return this.customerService.delete(id);
	}
}
