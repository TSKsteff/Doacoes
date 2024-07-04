import { IsNotEmpty } from "class-validator";
import { CreateUserDTO } from "./create-user.dto";


export class CreateDonationTargetDTO 
{
    @IsNotEmpty()
    moneyQuota?:number;
    
    @IsNotEmpty()
    moneyTotal?:number;
}