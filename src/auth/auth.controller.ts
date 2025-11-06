import { Body, 
         Controller, 
         Get, 
         ParseIntPipe, 
         Post, 
         Req, 
         Res, 
         UnauthorizedException, 
         UseGuards 
        } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDto } from './dtos/register.dto'
import { Request, Response } from 'express'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from 'src/utils/decorators/current-user.decorator'
import { GoogleGuard } from './guards/google.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true}) res: Response) {
    return await this.authService.register(dto, res)

  }

  @UseGuards(AuthGuard("local"))
  @Post('login')
  async login(
    @CurrentUser('id', ParseIntPipe) userId: number,
    @Res({ passthrough: true}) res: Response
  ) {
      return await this.authService.generateTokens(userId, res)
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  async refresh(
    @CurrentUser('id') userId: number,
    @Req()req: any,
    @Res({ passthrough: true }) res: Response
  ) {

    console.log('Refresh user:', userId);
    console.log('Refresh cookies:', req.cookies);

    if (!userId) {
      throw new UnauthorizedException('Invalid refresh token');
    }

      return await this.authService.generateTokens(userId, res)
  }

  @Post("logout")
	async logout(@Res({ passthrough: true }) res: Response) {
		res.cookie("refreshToken", "")
	}

  @UseGuards(GoogleGuard)
  @Get("google/callback")
  async googleCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response
  ) {
    console.log('Request user:', req.user);
  
      if (!req.user || !req.user.email) {
      throw new UnauthorizedException('Google authentication failed');
    }

    return await this.authService.googleAuth(req.user.email, req.user.firstName, res);
  }

}
