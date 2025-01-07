import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { ValidationPipe } from "@nestjs/common";

async function start() 
{
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
    .setTitle('Урок по Nest.js')
    .setDescription('Документація REST API')
    .setVersion('1.0.0')
    .addTag('DimaBog')
    // Додаємо JWT-схему авторизації
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', // Опціонально, просто для документації
      },
      'JWT-auth', // Назва схеми безпеки
    )
    .build();

    console.log('Database Password:', process.env.POSTGRES_PASSWORD);
    console.log('Type of Password:', typeof process.env.POSTGRES_PASSWORD);


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

    app.useGlobalPipes(new ValidationPipe())
    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));

}

start();