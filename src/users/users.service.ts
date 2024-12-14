import { BadRequestException, ConflictException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dtos/create-user.dto'
import { PrismaService } from 'prisma/prisma.service'
import { GetUserDto } from './dtos/get-user.dto'

@Injectable()
export class UsersService {
	constructor( private readonly prismaServise: PrismaService) {}

	async createOne({ email, hashedPassword}: CreateUserDto) {
		const userByEmail = await this.prismaServise.user.findUnique({ where: { email } })

		if (userByEmail) {
			throw new ConflictException("User with is already existing")
		}

		const createUser = await this.prismaServise.user.create({
			data: {
				email,
				hashedPassword
			}
		})
		return createUser
	}

	async getOne({ id, email }: GetUserDto) {
		if (!id && !email) {
			throw new BadRequestException()
		}

		const user = await this.prismaServise.user.findFirst({
			where: { id, email }
		})

		return user
	}
}

