import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';

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

    async uploadFile(bucket: string, fileName: string, file: Buffer) {
        return this.client.putObject(bucket, fileName, file);
    }
}
