import { AuthService } from './auth.service';
import { PrismaModule } from './../prisma/prisma.module';
import { UserModule } from './../user/user.module';
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';


@Module({
    imports: [JwtModule.register({
        secret: process.env.JWT_SECRET_KEY
    }), forwardRef(()=> UserModule), PrismaModule],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {

}