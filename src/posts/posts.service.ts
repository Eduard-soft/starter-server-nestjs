import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Post } from '@prisma/client';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Post as PostModel } from '@prisma/client'

@Injectable()
export class PostsService {

	constructor( private readonly prismaService: PrismaService) {}

	async get(userId: number) {
		return await this.prismaService.post.findMany({
			where: { userId}
		})
	}

	async createOne({ title, content}: CreatePostDto, userId: number): Promise<Post> {
		const createPost = await this.prismaService.post.create({
			data: {
				title,
				content,
				userId
			}
		})

		return createPost
	}

	async updateOne(id: number, dto: UpdatePostDto, userId: number) {
		await this.getOneOrThrow(id, userId)

		const updatedPost = await this.prismaService.post.update({
			where: { id, userId },
			data: dto
		})

		return updatedPost
	}

	async deleteOne(id: number, userId: number) {
		await this.getOneOrThrow(id, userId)

		const deletePost = await this.prismaService.post.delete({
			where: { id, userId }
		})
		return deletePost
	}

		// Private methods
		private async getOneOrThrow(id: number, userId?: number): Promise<PostModel> {
			const post = await this.prismaService.post.findUnique({ where: { id } })
	
			if (!post) {
				throw new NotFoundException("Could not find any post")
			}
	
			return post
		}
}
