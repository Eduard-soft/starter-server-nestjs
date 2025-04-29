import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
	@IsEmail()
	@IsNotEmpty()
	email: string

	@IsString()
	hashedPassword?: string

	@ApiProperty({
		name: 'avatarUrl',
		description: 'Link to the image of the post',
		default: '/starter-server-nestjs/src/public/default.png',
		required: false
	})
	avatarUrl?: string
}
