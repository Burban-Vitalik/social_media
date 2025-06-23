import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

const DEFAULT_PORT = 4200;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const portFromConfig = configService.get<number>("PORT") || DEFAULT_PORT;
  const finalPort = process.env.PORT
    ? parseInt(process.env.PORT, 10)
    : portFromConfig;

  await app.listen(finalPort);
}

bootstrap();
