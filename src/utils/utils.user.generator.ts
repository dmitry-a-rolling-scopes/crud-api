import { User } from '../user.interface';
import { randomUUID } from 'node:crypto';

export class UserGenerator {
  static availableHobbies = [
    'Football',
    'Basketball',
    'Swimming',
    'Climbing',
    'Running',
  ];

  public static generateUsers(count: number): User[] {
    return Array.from({ length: count }, (): User => this.generateUser());
  }

  public static generateUuid(): string {
    return randomUUID();
  }

  private static generateUser(): User {
    const id = this.generateUuid();

    return {
      username: `user-${id}`,
      age: this.generateNumber(0, 100),
      id: id,
      hobbies: this.generateHobbies(),
    };
  }

  private static generateNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private static generateHobbies(): string[] {
    const shuffled = [...this.availableHobbies].sort(() => 0.5 - Math.random());

    return shuffled.slice(
      0,
      this.generateNumber(0, this.availableHobbies.length - 1),
    );
  }
}
