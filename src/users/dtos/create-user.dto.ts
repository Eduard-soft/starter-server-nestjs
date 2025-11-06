import { IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {

	email: string

	// @IsString()
	hashedPassword?: string

	firstName?: string

	@ApiProperty({
		name: 'avatarUrl',
		description: 'Link to the image of the post',
		default: '/starter-server-nestjs/src/public/default.png',
		required: false
	})
	avatarUrl?: string
}
