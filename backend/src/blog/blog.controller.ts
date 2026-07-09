import { Controller, Get, Post, Patch, Body, Param, ParseIntPipe } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog as BlogDto } from '../blog/dto/create-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  create(@Body() createBlogDto: BlogDto) {
    return this.blogService.createBlog(createBlogDto);
  }

  @Get()
  findAll() {
    return this.blogService.getAllBlogs();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.geBlogById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBlogDto: Partial<BlogDto>) {
    return this.blogService.updateBlog(id, updateBlogDto);
  }
}
