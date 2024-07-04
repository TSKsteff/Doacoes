import { IsString } from "class-validator"



export class CreateDonationDTO
{

    @IsString()
    donationTarget?: string;

    @IsString()
    donationType:string;

    @IsString()
    money: number;


}