import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceotors";
import { CreateUserDTO } from "./dto/create-user.dto";


@UseInterceptors(LogInterceptor)
@Controller('/users')
export class UserController{

constructor(private readonly userService: UserService) {}

    
    @Post("/create-user")
    async createUser(@Body() data: CreateUserDTO){
        return this.userService.createUser(data);
    }

}