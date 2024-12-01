import { Injectable } from '@nestjs/common';
import { InjectBot, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { CallbackRequest } from './callbackRequest';

const chatIds = [501103243];

@Update()
@Injectable()
export class CallbackService { 
  constructor(@InjectBot() private readonly bot: Telegraf<any>) {}

  @Start()
  async onStart(ctx: any) {
    await ctx.reply(ctx.chat.id);
    console.log(ctx.chat.id);
  }

  async sendMessage(request: CallbackRequest): Promise<void> {
    chatIds.forEach(async chatId => await this.bot.telegram.sendMessage(chatId, this.toText(request)));
  }

  toText(request:CallbackRequest) : string{
    return `Імя пиздюка: ${request.name}
Тип проєкту: ${request.typeOfProject}
Опис проєкту: ${request.description}
Ціна: від ${request.startPrice} до ${request.endPrice}
Почта гандона: ${request.email}
Номер телефону уєбана: ${request.phoneNumber}`;
  }
}
