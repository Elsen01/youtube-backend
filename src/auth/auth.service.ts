import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {Repository} from "typeorm";
import {JwtService} from "@nestjs/jwt";
import {AuthDto} from "./dto/auth.dto";
import {compare, genSalt, hash} from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
                private readonly jwtService: JwtService) {
    }

    async login(dto: AuthDto) {
        const user = await this.validateUser(dto)
        
        return {
            user: this.returnUserFields(user),
            assessToken: await this.issueAccessToken(user.id)
        }
    }
    async register(dto: AuthDto) {
        const oldUser = await this.userRepository.findOneBy({email: dto.email})
        if (oldUser) throw new BadRequestException("Email is Busy")

        const salt = await genSalt(10)

        const newUser = await this.userRepository.create({
            email: dto.email,
            password: await hash(dto.password, salt)

        })
        const user = await this.userRepository.save(newUser)
        
        return {
            user: this.returnUserFields(user),
            accessToken: await this.issueAccessToken(user.id)
            
        }
    }

    async validateUser(dto: AuthDto) {
        const user = await this.userRepository.findOne({
            where: {
                email: dto.email
            },
            select: ['id', 'email', 'password']
        })
        if (!user) throw new NotFoundException('User Not Found')

        const userValidPassword = await compare(dto.password, user.password)
        if (!userValidPassword) throw new UnauthorizedException('Incorrect passwords')

        return user
    }

    issueAccessToken(userId: number) {
        const data = {
            id: userId
        }
        // @ts-ignore
        return await this.jwtService.signAsync(data, {
            expiresIn: '31d'
        })
    }

    returnUserFields(user: UserEntity) {
        return {
            id: user.id,
            email: user.email
        }
    }
}