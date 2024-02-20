import {IsEmail, MinLength} from "class-validator";

export class AuthDto {
    @IsEmail()
    email: string
    
    @MinLength(6,{
        message:'not less than 6 symbols'
    })
    password: string
}