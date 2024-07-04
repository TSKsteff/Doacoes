import { CreateDonationDTO } from './dto/create-donation.dto';
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { CreateDonationTargetDTO } from './dto/create-donation-target.dto';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService){}

    async createUser(body: CreateUserDTO){

        
        return this.prisma.user.create({
            data:{
                nome: body.nome,
                email: body.email,
                password: body.password,
                fone: body.fone,
                image: body.image
            }
        });
            
    }

    async createDonation(body: CreateDonationDTO){
        return this.prisma.donation.create({
            data:{
                donationType: body.donationType,
                money: body.money,
            }
        });
            
    }

    async createDonationTarget(id:string, body: CreateDonationTargetDTO){
        return this.prisma.donationTarget.create({
            data:{
                ...body,
                donations:{
                    connect:{id},
                }

            }
        });
            
    }

    async show(id: string){
        await this.exists(id);
        return  this.prisma.user.findUnique({
            where: {
                id
            }
        });
    }

    async exists(id: string){
        if(!(await this.prisma.user.count({
            where: {
                id
            }
        }))){
            throw new NotFoundException('O usuario com esse id não existe.');
        }
    }

    async existsTarget(id: string){
        if(!(await this.prisma.donation.count({
            where: {
                id
            }
        }))){
            throw new NotFoundException('O usuario com esse id não existe.');
        }
    }


    async findListyByID(id: string){
        this.existsTarget(id);
        const list = await this.prisma.donationTarget
        .findFirst({
            where:{
                id
            },
            select:{
                donations:true
            }
        });
        return list;
    }

    async findyByIDTarget(id: string, value: CreateDonationTargetDTO){
        this.existsTarget(id);
            return this.prisma.donationTarget.findUnique({
                where: {
                    id
                }
            });
    }


    async findyByIDDonation(value: CreateDonationDTO){
            return this.prisma.donation.findUnique({
                where: {
                    donationTargetId: value.donationTarget
                }
            });
    }


}