import { Module } from '@nestjs/common'
import { PostsModule } from './posts/posts.module'
import { PrismaModule } from 'prisma/prisma.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    PrismaModule, 
    PostsModule, 
    UsersModule, 
    AuthModule],
})
export class AppModule {}
