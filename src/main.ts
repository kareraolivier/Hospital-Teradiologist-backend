import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as session from "express-session";
import "dotenv";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(
    session({
      secret: "keyboard",
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(3000);
  console.log(`localhost${3000}`);
}
bootstrap();
