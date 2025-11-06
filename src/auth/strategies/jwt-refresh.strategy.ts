import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { UsersService } from "src/users/users.service"
import { JwtPayload } from "src/utils/types/jwt-payload"
import { Request } from "express"

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
	constructor(
		private readonly configService: ConfigService,
		private readonly usersService: UsersService
	) {
		super({
				jwtFromRequest: ExtractJwt.fromExtractors([
					(req: Request) => {
						console.log('All cookies:', req.cookies)
						return req.cookies?.refreshToken
					}
				]),
				ignoreExpiration: false,
				secretOrKey: configService.getOrThrow("JWT_REFRESH_SECRET")
		})
	}

	async validate(payload: JwtPayload) {
		console.log('Refresh payload:', payload)
		const user = await this.usersService.getOne({ id: payload.userId })

		if (!user) {
			throw new UnauthorizedException('Юзер не найден')
		}

		return { id: user.id,
						userId: user.id,
						email: user.email }
	}
}