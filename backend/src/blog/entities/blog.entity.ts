import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('blog')
export class Blog {
    @PrimaryGeneratedColumn()
    author!: string;

    @Column({ unique: true })
    title!: string;
    @Column({ default: "Tech" })
    category!: string;

    @Column({ nullable: false })
    Content!: string;
}