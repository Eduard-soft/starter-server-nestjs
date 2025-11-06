import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Logger, ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Bootstrap')
  app.use((req, res, next) => {
    logger.log(`Incoming: ${req.method} ${req.url}`)
    next()
  })

  const config = new DocumentBuilder()
    .setTitle('Server-Starter')
    .setDescription('The server API description')
    .setVersion('1.0')
    .addTag('server')
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, documentFactory)

  app.useGlobalPipes(new ValidationPipe())

  app.use(cookieParser())

  await app.listen(3000, '0.0.0.0')
}
bootstrap()
