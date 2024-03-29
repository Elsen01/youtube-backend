import {Base} from "../utils/base";
import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {UserEntity} from "./user.entity";
import {VideoEntity} from "./video.entity";

@Entity('comment')
export class CommentEntity extends Base {
    
    @Column({name:'text'})
    message: string
    
    @ManyToOne(()=> UserEntity)
    @JoinColumn({name:'user_id'})
    user: UserEntity
    
    @ManyToOne(()=> VideoEntity,video => video.comments)
    @JoinColumn({name:'video_id'})
    video: VideoEntity
}