import {Module} from "@nestjs/common";
import {CommentController} from "./comment.controller";
import {CommentService} from "./comment.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommentEntity} from "../entities/comment.entity";
import {VideoEntity} from "../entities/video.entity";

@Module({
    controllers:[CommentController],
    providers:[CommentService],
    imports:[TypeOrmModule.forFeature([CommentEntity])]
})
export class CommentModule{}