import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver } from "@nestjs/apollo";
import { join } from "path";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env"], // ми це робимо, щоб вказати шлях до файлу з змінними середовища
      isGlobal: true, // робимо змінні середовища доступними глобально
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
      playground: true,
      context: ({ req }) => ({ headers: req.headers }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
