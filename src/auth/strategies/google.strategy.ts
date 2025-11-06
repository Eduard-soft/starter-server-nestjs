import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Profile, Strategy } from "passport-google-oauth20"
import { AuthService } from "../auth.service"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class GoogleStrategy extends PassportStrategy( Strategy ) {
	
	constructor(
					private readonly authService: AuthService,
					private readonly configService: ConfigService
	) {
		super({
			clientID: configService.getOrThrow("GOOGLE_CLIENT_ID"),
			clientSecret: configService.getOrThrow("GOOGLE_CLIENT_SECRET"),
			callbackURL: "http://localhost:3000/auth/google/callback",
			scope: ["email","profile"]
		})
	}

	async validate(
		accessToken: string, 
		refreshToken: string,
		profile: Profile, 
		done: any
	) {

		console.log('Google profile:', profile); // Для отладки

		const user = {
      id: profile.id,
      email: profile.emails?.[0]?.value,
      firstName: profile.name?.givenName,
      lastName: profile.name?.familyName,
      displayName: profile.displayName,
      photo: profile.photos?.[0]?.value,
      accessToken
    };

    if (!user.email) {
      return done(new Error('No email provided by Google'), null);
    }

    done(null, user);

	}
}
