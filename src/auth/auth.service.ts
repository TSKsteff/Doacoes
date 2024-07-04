import { IsString } from 'class-validator';

import { UserService } from './../user/user.service';
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { user } from "@prisma/client";
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class AuthService{
    
    constructor(
        private readonly jWtsService: JwtService,
        private readonly prisma:PrismaService){}

    createToken(user: user){
        return {
            accesToken: this.jWtsService.sign({
                id: user.id,
                name: user.nome,
                email: user.email
            },{
                expiresIn: '2 days',
                subject: String(user.id),
                issuer: 'login',
                audience: 'Users'
            })
        }
    }
    checkToken(token: string){
        try{    
            const data = this.jWtsService.verify(token, {
                audience: 'Users',
                issuer: 'login',
            });
            return data;
        }catch(e){
            throw new BadRequestException(e);
        }
    }

    async login(email:string, password:string){

        const user = await this.prisma.user.findFirst({ 
            where:{
                email
            }
        });

        if(!user){
            throw new UnauthorizedException('E-mail e/ou senha incorretos.');
        }

        if(!(password===user.password)){ 
            throw new UnauthorizedException('E-mail e/ou senha incorretos.');
        }

        return this.createToken(user);
    }

    isValidToken(token: string) {
        try {
            this.checkToken(token);
            return true;
        } catch (err) {
            return false;
        }
    }

    async setImage(id:string ,image: Buffer){
        return this.prisma.user.update({
            where:{
                id: id
            },
            data:{
                image
            },
        });
    }
}