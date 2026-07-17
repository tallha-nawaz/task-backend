import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: 'John', description: 'Customer first name' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Customer last name' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Customer email address' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: '+1234567890', description: 'Optional phone number' })
  @IsOptional()
  @IsString()
  phone?: string | null;
}


export class UpdateCustomerDto {
  @ApiPropertyOptional({ example: 'John', description: 'Customer first name' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe', description: 'Customer last name' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ example: 'john.doe@example.com', description: 'Customer email address' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '+1234567890', description: 'Optional phone number' })
  @IsOptional()
  @IsString()
  phone?: string | null;
}
