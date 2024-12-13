import { Body, Controller, Post, Get, Patch, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { Post as PostModel } from '@prisma/client';
import { UpdatePostDto } from './dtos/update-post.dto';
// import { Post as PrismaService } from '@prisma/client';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async get() {
    return await this.postsService.get()
  }

  @Post()
  async createOne(@Body() dto: CreatePostDto): Promise<PostModel> {
    return await this.postsService.createOne(dto)
  }

  @Patch(":id")
	async updateOne(
		@Param("id", ParseIntPipe) id: number,
		@Body() dto: UpdatePostDto) {
		return await this.postsService.updeteOne(id, dto)
	}

	@Delete(":id")
	async deleteOne(@Param("id", ParseIntPipe) id: number) {
		return await this.postsService.deleteOne(id)
	}
}
