import { Body, Controller, Get, Post } from '@nestjs/common';
import { CallbackService } from './callback.service';
import { CallbackRequest } from './callbackRequest';
import { ApiResponse } from '@nestjs/swagger';

@Controller('sendForm')
export class CallbackController {
  constructor(private readonly callbackService: CallbackService) {}
  
  @ApiResponse({status: 200})
  @Post('send')
  async sendForm(@Body() dto: CallbackRequest): Promise<string> {
    await this.callbackService.sendMessage(dto);
    return 'Повідомлення надіслано!';
  }
}
