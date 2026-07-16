import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
	constructor(private readonly prisma: PrismaService) {}

	getAll(opts?: { page?: number; limit?: number }) {
		const page = opts?.page && opts.page > 0 ? opts.page : 1;
		const limit = opts?.limit && opts.limit > 0 ? opts.limit : 10;
		const take = limit;
		const skip = (page - 1) * limit;
		return this.prisma.customer.findMany({
			orderBy: { createdAt: 'desc' },
			take,
			skip,
		});
	}

	getById(id: number) {
		return this.prisma.customer.findUnique({ where: { id } });
	}

	create(dto: CreateCustomerDto) {
		try {
			return this.prisma.customer.create({ data: dto as any });
		} catch (error: any) {
			if (error?.code === 'P2002') throw new ConflictException('Email must be unique');
			throw error;
		}
	}

	replace(id: number, dto: CreateCustomerDto) {
		try {
			return this.prisma.customer.update({ where: { id }, data: dto as any });
		} catch (error: any) {
			if (error?.code === 'P2025') throw new NotFoundException('Customer not found');
			if (error?.code === 'P2002') throw new ConflictException('Email must be unique');
			throw error;
		}
	}

	update(id: number, dto: UpdateCustomerDto) {
		try {
			return this.prisma.customer.update({ where: { id }, data: dto as any });
		} catch (error: any) {
			if (error?.code === 'P2025') throw new NotFoundException('Customer not found');
			if (error?.code === 'P2002') throw new ConflictException('Email must be unique');
			throw error;
		}
	}

	delete(id: number) {
		try {
			return this.prisma.customer.delete({ where: { id } });
		} catch (error: any) {
			if (error?.code === 'P2025') throw new NotFoundException('Customer not found');
			throw error;
		}
	}
}
