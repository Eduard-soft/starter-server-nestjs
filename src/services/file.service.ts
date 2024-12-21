import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class FileService {
	private readonly s3Client = new S3Client({
		region: this.configService.getOrThrow("AWS_S3_REGION"),
    endpoint: this.configService.getOrThrow("AWS_S3_ENTRYPOINT")
	})

	constructor(private readonly configService: ConfigService) {}

	async upload(key: string, buffer: Buffer) {
		await this.s3Client.send(
			new PutObjectCommand({
				Bucket: "245800ef-ea2caf8e-b579-470b-8328-398c87b5f8b7",
				Key: key,
				Body: buffer
			})
		)
	}
}


//

// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import * as AWS from 'aws-sdk';

// @Injectable()
// export class FileService {
//   private readonly s3Client: S3Client;

//   constructor(private readonly configService: ConfigService) {
//     this.s3Client = new S3Client({
//       region: this.configService.getOrThrow('AWS_S3_REGION'),
//     });
//   }

//   async upload(key: string, buffer: Buffer): Promise<void> {
//     await this.s3Client.send(
//       new PutObjectCommand({
//         Bucket: '245800ef-starter',
//         Key: key,
//         Body: buffer,
//       }),
//     );
//   }
// }


