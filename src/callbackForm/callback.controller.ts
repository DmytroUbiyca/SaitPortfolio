import { Body, Controller, Get } from '@nestjs/common';
import { CallbackService } from './callback.service';
import { CallbackRequest } from './callbackRequest';

@Controller('notify')
export class NotifyController {
  constructor(private readonly callbackService: CallbackService) {}

  @Get('sendForm')
  async sendForm(@Body() dto: CallbackRequest): Promise<string> {

    const chatId = 123456789; // ваш chat ID
    const message = 'Привіт від Nest.js!';



    await this.callbackService.sendMessage(chatId, message);
    return 'Повідомлення надіслано!';
  }
}
