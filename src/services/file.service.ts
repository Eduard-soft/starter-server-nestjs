import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
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

	async delete(key: string) {
			await this.s3Client.send(
				new DeleteObjectCommand({
					Bucket: "245800ef-ea2caf8e-b579-470b-8328-398c87b5f8b7",
				  Key: key
				})
			)
	}
}



