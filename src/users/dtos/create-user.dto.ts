import { IsString } from "class-validator"

export class CreateUserDto {

	@IsString()
	email: string

	@IsString()
	hashedPassword: string

	avatarUrl: string
}