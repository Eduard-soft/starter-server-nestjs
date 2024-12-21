import { Body, 
         Controller, 
         Post, 
         Get, 
         Patch, 
         Param, 
         ParseIntPipe, 
         Delete, 
         UseGuards,
         UseInterceptors, UploadedFile
} from '@nestjs/common';
import { PostsService } from './posts.service'
import { CreatePostDto } from './dtos/create-post.dto'
import { Post as PostModel } from '@prisma/client'
import { UpdatePostDto } from './dtos/update-post.dto'
// import { Post as PrismaService } from '@prisma/client'
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard'
import { CurrentUser } from 'src/utils/decorators/current-user.decorator'
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAccessGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async get(
    @CurrentUser("id", ParseIntPipe) userId: number
    ):Promise<PostModel[]> {
    return await this.postsService.get(userId)
  }

  @Post()
  async createOne(
    @Body() dto: CreatePostDto,
    @CurrentUser("id", ParseIntPipe) userId: number
  ): Promise<PostModel> {
    return await this.postsService.createOne(dto, userId)
  }

  @Patch(":id")
  @UseInterceptors(FileInterceptor('picture'))
	async updateOne(
		@Param("id", ParseIntPipe) id: number,
		@Body() dto: UpdatePostDto,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser("id", ParseIntPipe) userId: number
  ): Promise<PostModel> {
		return await this.postsService.updateOne(id, dto, userId, file)
	}

  // @Patch()
  // @UseInterceptors(FileInterceptor('avatar'))
  // async updateOne(
  //   @CurrentUser("id", ParseIntPipe) userId: number,
  //   @Body() dto: UpdateUserDto,
  //   @UploadedFile() file: Express.Multer.File
  // ) {
  //   return await this.usersService.updateOne(userId, dto, file)
  // }

	@Delete(":id")
	async deleteOne(
    @Param("id", ParseIntPipe) id: number,
    @CurrentUser("id", ParseIntPipe) userId: number
  ): Promise<PostModel> {
		return await this.postsService.deleteOne(id, userId)
	}
}
