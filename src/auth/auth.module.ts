import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./auth.constants";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guard";
import { RolesGuard } from "./role/roles.guard";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "6h" },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AuthModule {}
