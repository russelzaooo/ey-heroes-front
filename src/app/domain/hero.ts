import { Power } from './power';
import { Universe } from './universe';

export class Hero {
    id: number;
    name: string;
    powers: Array<Power>;
    universe: Universe;
    created_at: Date;
  }