import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ServerCredentials } from '@grpc/grpc-js';

async function bootstrap() {
	const port = process.env.PORT || 3001;

	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
		transport: Transport.GRPC,
		options: {
			url: `0.0.0.0:${port}`,
			credentials: ServerCredentials.createInsecure(),
			package: 'hero',
			protoPath: join(__dirname, 'proto/hero.proto'),
		},
	});

	await app.listen();
	Logger.log(`🚀 gRPC service running...`);
}

bootstrap().catch((e) => {
	console.error('Fatal error, exiting...', e);
	process.exit(1);
});
