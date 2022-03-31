import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { Serlize } from 'src/serialization.interceptor';
import { AuthService } from './auth.service';
import {
  CreateAuthDto,
  createOtpDto,
  ResponseSendCodeDto,
} from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Serlize(ResponseSendCodeDto)
  @Post('sendcode')
  async sendCode(@Body() sendCodeDto: CreateAuthDto) {
    const type = process.env.AUTH_TYPE;
    if (type === 'phoneNumber') {
      const isExistOtp = await this.authService.findOtpWithPhonenumber(
        sendCodeDto.phoneNumber,
        sendCodeDto.role,
      );
      if (isExistOtp) {
        const isPending = isExistOtp.toJSON().status === 'pending';
        if (isPending) throw new HttpException('RateLimiter_Error', 429);
        isExistOtp.verificationCode = this.authService.verificationCode();
        isExistOtp.verificationDate = new Date(Date.now());
        isExistOtp.failedAttemps = 0;
        isExistOtp.save();
        return isExistOtp;
      } else {
        const createOtpDto: Partial<createOtpDto> = {
          phoneNumber: sendCodeDto.phoneNumber,
          role: sendCodeDto.role,
        };
        return await this.authService.createOtp(createOtpDto as createOtpDto);
      }
    } else if (type === 'email') {
      const isExistOtp = await this.authService.findOtpWithEmail(
        sendCodeDto.email,
        sendCodeDto.role,
      );
      if (isExistOtp) {
        const isPending = isExistOtp.toJSON().status === 'pending';
        if (isPending) throw new HttpException('RateLimiter_Error', 429);
        isExistOtp.verificationCode = this.authService.verificationCode();
        isExistOtp.verificationDate = new Date(Date.now());
        isExistOtp.failedAttemps = 0;
        isExistOtp.save();
        return isExistOtp;
      } else {
        const createOtpDto: Partial<createOtpDto> = {
          email: sendCodeDto.email,
          role: sendCodeDto.role,
        };
        return await this.authService.createOtp(createOtpDto as createOtpDto);
      }
    }
  };
}
