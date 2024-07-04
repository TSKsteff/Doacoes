import { CreateDonationTargetDTO } from './../user/dto/create-donation-target.dto';
import { CreateDonationDTO } from './../user/dto/create-donation.dto';
import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';
import { Body, Get, Controller, Headers, Post, UseGuards,Req, UseInterceptors, UploadedFile, BadRequestException, UploadedFiles, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, Param } from "@nestjs/common";
import { AuthLoginDTO } from './dto/login.dto';
import { AuthGuards } from 'src/guards/auth.gaurds';


@Controller('user/auth')
export class AuthController{
 
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService){}

    @Post('/login')
    async login(@Body() body: AuthLoginDTO){
        return this.authService.login(body.email, body.password);
    }

    @UseGuards(AuthGuards)
    @Post(':id/setImage')
    async setImage(@Param("id") id: string, image:Buffer){
        return this.authService.setImage(id, image);
    }

    @UseGuards(AuthGuards)
    @Get(':id')
    async findbyID(@Param("id") id:string){
            return this.userService.show(id);
    }

    @UseGuards(AuthGuards)
    @Post(":id/dtarget/create-donationTarget")
    async createDonationTarget(@Param("id") id:string, @Body() data: CreateDonationTargetDTO){
        return this.userService.createDonationTarget(id, data);
    }

    @UseGuards(AuthGuards)
    @Get(':id/dtarget')
    async findyByIDTarget(@Param("id") id:string, @Body() value: CreateDonationTargetDTO){
        return this.userService.findyByIDTarget(id, value);
    }
    
    @UseGuards(AuthGuards)
    @Get(':id/dtarget/danotions')
    async findListyByID(@Param("id") id:string){
        return this.userService.findListyByID(id);
    }

    @UseGuards(AuthGuards)
    @Post("/donation/create-donation")
    async createDonation(@Body() data: CreateDonationDTO){
        return this.userService.createDonation(data);
    }

    @UseGuards(AuthGuards)
    @Get('/donation')
    async findyByIDDonation(@Body() value: CreateDonationDTO){
        return this.userService.findyByIDDonation(value);
    }

}
