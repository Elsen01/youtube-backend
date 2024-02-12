import {Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {VideoEntity} from "./video.entity";
import {UserEntity} from "./user.entity";
import {Base} from "../utils/base";

@Entity('subscription')
export class SubscriptionEntity extends Base{
    
    @ManyToOne(()=> UserEntity,user =>user.subscriptions)
    @JoinColumn({name:'from_user_id'})
    fromUser: UserEntity
    
    
    @ManyToOne(()=>UserEntity,user =>user.subscriptions)
    @JoinColumn({name:'to_channel_id'})
    toChannel: UserEntity
}