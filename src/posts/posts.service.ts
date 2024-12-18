import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Post } from '@prisma/client';
import { UpdatePostDto } from './dtos/update-post.dto';

@Injectable()
export class PostsService {

	constructor( private readonly prismaService: PrismaService) {}

	async get() {
		return await this.prismaService.post.findMany()
	}

	async createOne(dto: CreatePostDto): Promise<Post> {
		const post = await this.prismaService.post.create({
			data: dto
		})

		return post
	}

	async updeteOne(id: number, dto: UpdatePostDto) {
		await this.getOneOrThrow(id)

		const updetedPost = await this.prismaService.post.update({
			where: { id },
			data: dto
		})

		return updetedPost
	}

	async deleteOne(id: number) {
		await this.getOneOrThrow(id)

		const deletePost = await this.prismaService.post.delete({
			where: { id }
		})
		return deletePost
	}

		// Private methods
		private async getOneOrThrow(id: number) {
			const task = await this.prismaService.post.findUnique({ where: { id } })
	
			if (!task) {
				throw new NotFoundException("Could not find any task")
			}
	
			return task
		}
}
