export class FakeHttpError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}
