import { User } from '../user.interface';
import { UserGenerator } from './utils.user.generator';

export class UserFactory {
  public static create(username: string, age: number, hobbies: string[]): User {
    return {
      id: UserGenerator.generateUuid(),
      username: username,
      age: age,
      hobbies: hobbies,
    };
  }
}
