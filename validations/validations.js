import { body } from "express-validator";

export const registerValidator = [
  body("email", "Incorrect email format").isEmail(),
  body("password", "The password must contain at least 5 symbols").isLength({
    min: 5,
  }),
  body("fullName", "The name must contain at least 3 symbols").isLength({
    min: 3,
  }),
  body("avatarUrl", "The url is not correct").optional().isURL(),
];

export const loginValidator = [
  body("email", "Incorrect email format").isEmail(),
  body("password", "The password must contain at least 5 symbols").isLength({
    min: 5,
  }),
];

export const postCreateValidator = [
  body("title", "Введите заголовок статьи").isLength({ min: 3 }).isString(),
  body("text", "Введите текст статьи").isLength({ min: 3 }).isString(),
  body("tags", "Неверный формат тэгов").optional().isString(),
  body("imageUrl", "Неверная ссылка на изображение").optional().isString(),
];
