import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { hero } from './proto/hero';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@GrpcMethod('HeroesService', 'FindOne')
	findOne(data: hero.HeroById, metadata: Metadata, call: ServerUnaryCall<any, any>): hero.Hero {
		return this.appService.findOne(data.id);
	}
}
