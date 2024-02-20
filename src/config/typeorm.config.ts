import {ConfigService} from "@nestjs/config"
import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export const getTypeOrmConfig = async (configService: ConfigService):Promise<TypeOrmModuleOptions> => ({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: 'test123',
    database: 'postgres',
    entities: ['dist/entities/*{.ts,.js}']
})