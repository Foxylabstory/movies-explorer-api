const badRequestMessage = 'Переданы некорректные данные для данной операции';
const notFoundMessage = 'Запрашиваемые данные по указанному id не найдены';
const forbiddenMessage = 'Удаляемая запись принадлежит другому пользователю';
const conflictMessage = 'Пользователь с такой почтой уже существует';
const authorizationMessage = 'Необходима авторизация';
const emailPasswordAuthorizationMessage = 'Неправильные почта или пароль';
const emailValidationMesssage = 'Неправильный формат почты';
const urlValidationMesssage = 'Неправильный формат ссылки';
const crashMessage = 'Сервер сейчас упадёт';
const pageNotFoundMessage = 'Страница не найдена';
const internalServerErrorMessage = 'На сервере произошла ошибка';

module.exports = {
  notFoundMessage,
  badRequestMessage,
  forbiddenMessage,
  conflictMessage,
  authorizationMessage,
  emailPasswordAuthorizationMessage,
  emailValidationMesssage,
  urlValidationMesssage,
  crashMessage,
  pageNotFoundMessage,
  internalServerErrorMessage,
};
