export class UndefinedUserEmailError extends Error {
  constructor() {
    super("Undefined user email");
    Object.setPrototypeOf(this, UndefinedUserEmailError);
  }

  test() {
    return "";
  }
}

export class UndefinedUserPasswordError extends Error {
  constructor() {
    super("Undefined user password");
    Object.setPrototypeOf(this, UndefinedUserPasswordError);
  }

  test() {
    return "";
  }
}
