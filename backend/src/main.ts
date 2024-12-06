import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";

const PORT=process.env.PORT
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: "*" });
  await app.listen(PORT);
}
bootstrap();
