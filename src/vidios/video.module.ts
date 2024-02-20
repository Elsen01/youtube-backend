import {Module} from "@nestjs/common";
import {VideoController} from "./video.controller";
import {VideoService} from "./video.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {VideoEntity} from "../entities/video.entity";
import {CommentEntity} from "../entities/comment.entity";

@Module({
    controllers:[VideoController],
    providers:[VideoService],
    imports:[TypeOrmModule.forFeature([VideoEntity])]
})
export class VideoModule{}