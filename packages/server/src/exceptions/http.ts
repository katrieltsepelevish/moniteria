class HttpException extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);

    this.name = 'HttpError';
    this.status = status;
  }
}

export default HttpException;
