import { Injectable } from '@nestjs/common';
import { InjectBot, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';

@Update()
@Injectable()
export class CallbackService { 
  constructor(@InjectBot() private readonly bot: Telegraf<any>) {}

  @Start()
  async onStart(ctx: any) {
    await ctx.reply(ctx.message.chatId);
  }

  async sendMessage(chatId: number, text: string): Promise<void> {
    await this.bot.telegram.sendMessage(chatId, text);
  }
}
