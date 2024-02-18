import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class GetPayableDTO {
  @IsNotEmpty({ message: 'profileClientId must not be empty' })
  @IsPositive({ message: 'profileClientId must be a positive number' })
  @IsNumber({}, { message: 'profileClientId must be a number' })
  profileClientId: number;

  @IsNotEmpty({ message: 'status must not be empty' })
  @IsString({ message: 'status must be a string' })
  status: string;

  @IsOptional({ message: 'offset must be opcional' })
  @IsNumber({}, { message: 'offset must be a number' })
  offset: number;

  @IsOptional({ message: 'limit must be opcional' })
  @IsNumber({}, { message: 'limit must be a number' })
  @IsPositive({ message: 'limit must be a positive number' })
  limit: number;
}
