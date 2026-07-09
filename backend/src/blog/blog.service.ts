import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BlogEntity } from "./entities/blog.entity"
import {Blog, Blog as BlogDto} from "../blog/dto/create-blog.dto"


@Injectable()
export class BlogService{
    constructor(
        @InjectRepository(BlogEntity)
        private readonly blogRepository: Repository<BlogEntity>,
    ){}

    async createBlog(dto: BlogDto): Promise<BlogEntity> {
            const newBlog = this.blogRepository.create ({
            title: dto.Title,
            author: dto.Author,
            category: dto.Category,
            Content: dto.Content,
        })
        return await this.blogRepository.save(newBlog);
    }

    async getAllBlogs(): Promise<BlogEntity[]> {
        return await this.blogRepository.find();
    }

    async geBlogById(id: number): Promise<BlogEntity> {
        const blog = await this.blogRepository.findOneBy({ id });
        if (!blog) {
        throw new NotFoundException(`Blog with ID ${id} not found`);
        }
        return blog;
    }

    async updateBlog(id: number, dto: Partial<BlogDto>): Promise<BlogEntity> {
        const blog = await this.blogRepository.findOneBy({ id });

        if (!blog) {
            throw new NotFoundException(`Blog with ID ${id} not found`);
        }

        if (dto.Title !== undefined) blog.title = dto.Title;
        if (dto.Author !== undefined) blog.author = dto.Author;
        if (dto.Category !== undefined) blog.category = dto.Category;
        if (dto.Content !== undefined) blog.Content = dto.Content;

        return await this.blogRepository.save(blog);
    }

    async deleteBlogbyId(id: number): Promise<string> {
        const blog = await this.blogRepository.findOneBy({ id });

        if (!blog) {
            throw new NotFoundException(`Blog with ID ${id} not found`);
        }

        await this.blogRepository.delete(id);
        return 'Blog Deleted Successfully';
    }

    async deelteAll(dto: BlogDto): Promise<string> {
        await this.blogRepository.deleteAll()
        return "All Blogs deleted Successfully";
    }
}