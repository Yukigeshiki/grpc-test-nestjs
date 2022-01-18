import { Injectable } from '@nestjs/common';
import { hero } from './proto/hero';

@Injectable()
export class AppService {
	findOne(id: number): hero.Hero {
		const items = [
			{ id: 1, name: 'John' },
			{ id: 2, name: 'Doe' },
		];
		return items.find((item) => item.id === id);
	}
}
