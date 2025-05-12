export class Validator {
  public static isUuidV4(uuid: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      uuid,
    );
  }

  public static isUserDataValid = (
    username: unknown,
    age: unknown,
    hobbies: unknown,
  ) => {
    return (
      typeof username === 'string' &&
      typeof age === 'number' &&
      Array.isArray(hobbies) &&
      hobbies.every((hobby) => typeof hobby === 'string')
    );
  };
}
