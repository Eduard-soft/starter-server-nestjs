import { IsString } from "class-validator"

export class CreateUserDto {

	email: string
	
	hashedPassword?: string

	avatarUrl?: string
}
