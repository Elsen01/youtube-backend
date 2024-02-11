import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('user')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
     
    @Column({unique: true})
    email: string
    
    @Column({select: false})
    password: string
    
    @Column({default: ''})
    name: string
    
    @Column({default: false,name:'is_verified'})
    isVerified: boolean
    
    @Column({default:'0',name:'subscribers_count'})
    subscribersCount?: number
    
    @Column({default:'',name:'text'})
    description: string
    
    @Column({default: '', name:'avatar_path'})
    avatarPath: string
}