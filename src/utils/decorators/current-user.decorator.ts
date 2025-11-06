import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { User } from "@prisma/client"

export const CurrentUser = createParamDecorator(
	(data: keyof User | undefined, ctx: ExecutionContext) => {
		const req = ctx.switchToHttp().getRequest()

    console.log('=== CurrentUser Decorator ===')
    console.log('Data:', data)
    console.log('Request user:', req.user)
    
    if (!req.user) {
      return null
    }
    
    return data ? req.user[data] : req.user
	}
)