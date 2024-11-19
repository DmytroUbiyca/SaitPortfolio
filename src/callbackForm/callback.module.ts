import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CallbackService } from './callback.service';
import { CallbackController } from './callback.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'development.env',
      isGlobal: true,
    }),
    TelegrafModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const token = configService.get<string>('TELEGRAM_BOT_TOKEN');
        console.log('Telegram Bot Token:', token); // Вивід токена в консоль
        return {
          token,
        };
      },
    }),
  ],
  controllers: [CallbackController],
  providers: [CallbackService],
})

export class CallbackModule {}
