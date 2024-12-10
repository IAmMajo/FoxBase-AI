declare module "#auth-utils" {
  interface UserSession {
    user: {
      id: number;
      username: string;
    };
  }
}
