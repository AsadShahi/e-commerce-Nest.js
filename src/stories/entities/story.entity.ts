


import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn, UpdateDateColumn } from 'typeorm';
import { StoryStatus } from '../enum/storyStatusEnum';


@Entity()
export class Story {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    imageUrl: string;

    @Column({ type: "enum", enum: StoryStatus, default: StoryStatus.PENDING })
    status: StoryStatus; // e.g., 'pending', 'approved', 'rejected'

    @ManyToOne(() => User, (user) => user.stories)
    @JoinColumn({ name: "sellerId" })
    seller: User;

    @Column()
    sellerId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date
}
