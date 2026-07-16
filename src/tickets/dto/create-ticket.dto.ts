import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({ example: 'Login issue', description: 'Title of the ticket' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'User cannot log in with valid credentials', description: 'Detailed description of the issue' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1, description: 'Customer ID who owns this ticket' })
  @IsNumber()
  customerId: number;

  @ApiPropertyOptional({
    example: 'OPEN',
    description: 'Current status of the ticket',
    enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'],
  })
  @IsOptional()
  @IsEnum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'])
  status?: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';

  @ApiPropertyOptional({
    example: 'MEDIUM',
    description: 'Priority level of the ticket',
    enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
  })
  @IsOptional()
  @IsEnum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'])
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
}
