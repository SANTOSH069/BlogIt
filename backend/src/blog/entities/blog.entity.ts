import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('blog')
export class BlogEntity {

    @PrimaryGeneratedColumn()
    @Column()
    id !: number;

    @Column({nullable:false})
    author!: string;

    @Column({ unique: true })
    title!: string;

    @Column({ default: "Tech" })
    category!: string;

    @Column({ nullable: false })
    Content!: string;

    @CreateDateColumn()
    createdAt !: Date;

    @UpdateDateColumn()
    upDatedAt !: Date;
    
}

