export interface UserRequestInterface extends Request {
  user: {
    sub: string;
  };
}
