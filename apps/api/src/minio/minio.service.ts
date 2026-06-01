import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import { randomUUID } from 'crypto';
import { ProductImage } from 'src/products/entities/product-image.entity';

@Injectable()
export class MinioService {
    private readonly client: Minio.Client;

    constructor() {
        this.client = new Minio.Client({
            endPoint: 'localhost',
            port: 9000,
            useSSL: false,
            accessKey: 'minioadmin',
            secretKey: 'minioadmin',
        });
    }

    getPublicUrl(bucket: string, fileName: string) {
        return `http://localhost:9000/${bucket}/${fileName}`;
    }

    getPublicUrls(images: ProductImage[]) {
        return images.map((image) => ({
            id: image.id,
            url: this.getPublicUrl(image.bucket, image.fileName),
        }));
    }

    async uploadFile(bucket: string, file: Express.Multer.File) {
        const fileName = `${Date.now()}-${randomUUID()}`;

        return this.client.putObject(bucket, fileName, file.buffer);
    }

    async uploadFiles(bucket: string, files: Express.Multer.File[]) {
        return Promise.all(
            files.map(async (file) => {
                const fileName = `${Date.now()}-${randomUUID()}`;

                await this.client.putObject(bucket, fileName, file.buffer);

                return {
                    fileName,
                    bucket,
                };
            }),
        );
    }
}
