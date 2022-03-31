import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAuthDto, createOtpDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { OTP, OTPDocument } from './schema/otp.schema';
import { Model } from 'mongoose';
import { randomInt } from 'crypto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(OTP.name) private OTPModel: Model<OTPDocument>) {}

  findOtpWithPhonenumber(phoneNumber: string, role: string) {
    return this.OTPModel.findOne({ phoneNumber, role });
  }

  async createOtp(createOtpDto:createOtpDto) {
    const verificationCode = this.verificationCode();
    createOtpDto.failedAttemps=0
    createOtpDto.verificationDate=new Date(Date.now())
    createOtpDto.verificationCode=verificationCode
    return await this.OTPModel.create(createOtpDto);
  }

  verificationCode() {
    return randomInt(1000000).toString().padStart(6, '0');
  }

  findOtpWithEmail(email: string, role: string) {
    return this.OTPModel.findOne({ email, role });
  }
}
