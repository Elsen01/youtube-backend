import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {Repository} from "typeorm";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
                private readonly jwtService: JwtService) {
    }
    
    issueAccessToken(userId:number) {
        const data = {
            id: userId
        }
        // @ts-ignore
        return await this.jwtService.signAsync(data, {
            expiresIn: '31d'
        })
    }
}