[![Tests](https://github.com/Foxylabstory/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/Foxylabstory/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests](https://github.com/Foxylabstory/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/Foxylabstory/express-mesto-gha/actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд

Продолжение работы над проектом Mesto, если в прошлих спринтах была написана часть отвечающая за фронт приложения, в том числе создание страниц отвечающих за регистрацию и авторизацию пользователя. То в данной части курса будет написана серверная часть проекта к которой в последующем будет подключена пользовательская часть.

## В этом проекта используются следующие технологии и инструменты

- Node.js как серверная часть языка JS
- фреймворк express
- нереляционная база данных (NO SQL) MongoDB
- для связи с базой данных MongoDB используется Object Document Mapper - Mongoose
- Сервис создания запросов к Api - Postman и/или Thunder Client 

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
`npm run lint` — проверяет проект на ошибки
