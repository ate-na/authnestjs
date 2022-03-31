import { Expose } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateAuthDto {
  @IsNumberString()
  @Matches(RegExp('^09[0-9]{9}$'))
  @IsOptional()
  phoneNumber?: string;
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsEnum(['user', 'provider'])
  role!: string;
}

export class ResponseSendCodeDto {
  @Expose()
  _id: string;

  @Expose()
  verificationCode: string;
}

export class createOtpDto {
  @IsNumberString()
  @Matches(RegExp('^09[0-9]{9}$'))
  @IsOptional()
  phoneNumber?: string;
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsEnum(['user', 'provider'])
  role!: string;

  @IsOptional()
  @IsString()
  verificationCode: string;

  @IsOptional()
  @IsDate()
  verificationDate: Date;

  @IsOptional()
  @IsNumber()
  failedAttemps: number;
}
