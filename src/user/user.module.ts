import { UseIdCheckMiddleware } from './../middlewares/user-id-check.middleware';
import { PrismaModule } from './../prisma/prisma.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod, forwardRef} from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports:[PrismaModule, forwardRef(()=> AuthModule)],
    controllers:[UserController],
    providers:[UserService],
    exports:[UserService]
})
export class UserModule implements NestModule{
   
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UseIdCheckMiddleware).forRoutes({
            path: 'users/id',
            method: RequestMethod.ALL
        });
    }
} 