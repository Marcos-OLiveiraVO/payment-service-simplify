import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class CreateTransactionDTO {
  @IsNumber({}, { message: 'profileClientId must be a number' })
  @IsPositive({ message: 'profileClientID must be a positive number' })
  @IsNotEmpty({ message: 'profileClientId must not be empty' })
  profileClientId: number;

  @IsNotEmpty({ message: 'amount must not be empty' })
  @IsNumber({}, { message: 'amount must be number' })
  amount: number;

  @IsNotEmpty({ message: ' description must not be empty' })
  @IsString({ message: 'description must be string' })
  @Length(10, 150, { message: 'description must be between 50 and 150 characters' })
  description: string;

  @IsNotEmpty({ message: 'paymentMethod must not be empty' })
  @IsString({ message: 'paymentMethod must be a string' })
  @Length(8, 12, { message: 'paymentMethod must be between 8 and 10 characters' })
  paymentMethod: string;

  @IsNotEmpty({ message: 'cardNumber must not be empty' })
  @IsString({ message: 'cardNumber must be a string' })
  @Length(13, 19, { message: 'cardNumber must be between 18 and 20 numbers' })
  cardNumber: string;

  @IsNotEmpty({ message: 'cardOwner must not be empty' })
  @IsString({ message: 'cardOwner must a string' })
  @Length(20, 150, { message: 'cardOwner must be between 20 and 150 characters' })
  cardOwner: string;

  @IsNotEmpty({ message: 'expirationDate must not be empty' })
  @IsDate({ message: 'expirationDate must be a date' })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  expirationDate: Date;

  @IsNotEmpty({ message: 'cvv must not be empty' })
  @Length(3, 3, { message: 'cvv must be exactly 3 numbers' })
  cvv: string;
}
