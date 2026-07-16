import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTicketDto {
  @ApiPropertyOptional({ example: 'Login issue', description: 'Title of the ticket' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'User cannot log in with valid credentials', description: 'Detailed description of the issue' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 1, description: 'Customer ID who owns this ticket' })
  @IsOptional()
  @IsNumber()
  customerId?: number;

  @ApiPropertyOptional({
    example: 'IN_PROGRESS',
    description: 'Current status of the ticket',
    enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'],
  })
  @IsOptional()
  @IsEnum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'])
  status?: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';

  @ApiPropertyOptional({
    example: 'HIGH',
    description: 'Priority level of the ticket',
    enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
  })
  @IsOptional()
  @IsEnum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'])
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
}
