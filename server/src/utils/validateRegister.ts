import { UserInputType } from "./UserInput";

export const validateRegister = (input: UserInputType) => {
  if (input.username.includes("@")) {
    return [
      {
        field: ".username",
        message: "Can't includes an @ ",
      },
    ];
  }
  if (input.username.length <= 2) {
    return [
      {
        field: "name",
        message: "name can't be less than 2 word",
      },
    ];
  }
  if (!input.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Invalid email",
      },
    ];
  }
  if (input.password.length < 6) {
    return [
      {
        field: "password",
        message: "password can't be less than 6 word",
      },
    ];
  }

  return null;
};
