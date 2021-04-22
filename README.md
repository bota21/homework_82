Для начала работы нужно клонировать проект командой на git bash:
> git clone ssh://git@git.attractor-school.com:30022/Aimkulova_Botagoz/homework_82.git

Перейти в папку homework_82 командой на git bash:
> cd homework_82

Для работы с проектом нужно установить все зависимости:
> npm install

Также для работы вам потребуется Mongodb, Node.js, npm.

Информацию по установке и ссылку для скачивания Mongodb можно найти по ссылке:
> https://docs.mongodb.com/manual/administration/install-community/

Инструкция по установке и ссылку для скачивания Node.js и npm можно найти по ссылке: 
  > https://nodejs.org/en/download/
  > https://nodejs.org/en/download/package-manager/
  Инструкция для linux
  > https://github.com/nodesource/distributions/blob/master/README.md#debinstall

#### GET /artists

Запрос на получение всех данных об исполнителях. Возвращает массив с объектами в виде:

```
[
  {
    _id: ObjectId,
    title: String,
    image: String,
    description: String
  }
]
```

Для получения всех исполнителей отправить запрос на endpoint: <br>
> http://localhost:2100/artists


#### GET /artists/:id

Для получения определенного музыканта отправить запрос на endpoint:<br>
> http://localhost:2100/artists/{artistID}
artistID - id определенного исполнителя 


#### POST /artists

Отправить данные в виде объекта:

```
{
    title: String,
    image: String,
    description: String
}
```
Все указанные поля обязательно должны быть заполнены, иначе вернется ошибка.

Еndpoind для отправки сообщения: <br>
> http://localhost:2100/artists


#### PUT /artists/:id

Для изменении данных по определенному музыканту отправить запрос на endpoint:<br>
> http://localhost:2100/artists/{artistID}
artistID - id определенного исполнителя

#### DELETE /artists

Для удаления по определенного музыканта отправить запрос на endpoint:<br>
> http://localhost:2100/artists/{artistID}
artistID - id определенного исполнителя




#### GET /albums

Запрос на получение всех данных об альбомах. Возвращает массив с объектами в виде:

```
[
  {
    _id: ObjectId,
    title: String,
    artist: ObjectId,
    year: String,
    cover: String
  }
]
```

Для получения всех альбомов отправить запрос на endpoint: <br>
> http://localhost:2100/albums

Для получения определенных исполнителей по альбомам отправить запрос на endpoint:
> http://localhost:2100/albums?artist={artistID}
artistID - id определенного исполнителя


#### GET /albums/:id

Для получения определенного музыканта отправить запрос на endpoint:<br>
> http://localhost:2100/albums/{albumID}
albumID - id определенного альбома

#### POST /albums

Отправить данные в виде объекта:

```
{
    title: String,
    artist: ObjectId,
    year: String,
    cover: String
}
```
Все указанные поля обязательно должны быть заполнены, иначе вернется ошибка.

> Еndpoind для отправки сообщения: <br>
> http://localhost:2100/albums

#### PUT /albums/:id

Для изменении данных по определенному альбому отправить запрос на endpoint:<br>
> http://localhost:2100/albums/{albumID}
albumID - id определенного альбома

#### DELETE /albums

Для удаления по определенного альбома отправить запрос на endpoint:<br>
> http://localhost:2100/albums/{albumID}
albumID - id определенного альбома





#### GET /tracks

Запрос на получение всех данных об композициях. Возвращает массив с объектами в виде:

```
[
  {
    _id: ObjectId,
    title: String,
    album: ObjectId,
    long: String
  }
]
```

Для получения всех композиции отправить запрос на endpoint: <br>
> http://localhost:2100/tracks

Для получения определенных альбомов по композициям отправить запрос на endpoint:
> http://localhost:2100/tracks?album={albumID}
albumID - id определенного альбома


#### GET /tracks/:id

Для получения определенной композиции отправить запрос на endpoint:<br>
> http://localhost:2100/tracks/{trackID}
trackID - id определенной композиции


#### POST /tracks

Отправить данные в виде объекта:

```
{
    title: String,
    album: ObjectId,
    long: String
}
```
Все указанные поля обязательно должны быть заполнены, иначе вернется ошибка.

> Еndpoind для отправки сообщения: <br>
> http://localhost:2100/albums

#### PUT /tracks/:id

Для изменении данных по определенной композиции отправить запрос на endpoint:<br>
> http://localhost:2100/tracks/{trackID}
trackID - id определенной композиции

#### DELETE /tracks

Для удаления по определенной композиции отправить запрос на endpoint:<br>
> http://localhost:2100/tracks/{trackID}
trackID - id определенной композиции

*** Аутентификация пользователя ***

#### POST /users

Чтобы пройти аутентификацию отправить данные пользователя на endpoint:
> http://localhost:2100/users

Отправить данные в виде объекта:

```
{
    username: String,
    password: String
}
```
При успешном запросе, вернется объект в виде:

```
{
    _id: ObjectId,
    username: String,
    token: String
}
```


#### POST users/session

Чтобы открыть сессию для пользователя, отправить запрос на endpoint:
> http://localhost:2100/users/session

Отправить данные в виде объекта:

```
{
    username: String,
    password: String
}
```
Если пароль или пользователь не будут найдены, вернется ошибка 'User not found' или 'Wrong password'.
При успешном запросе вернется сообщение 'Authentication passed'.

#### POST /track_history

Принимает токен аутентификации через заголовки запроса.

При успешном открытии сессии отправить данные в виде:
```
{
    track: ObjectId
}
```
track: ObjectId - id прослушанной композиции
 
 В базу на сервере придут данные в виде:
 
 ```{
  _id: ObjectId,
  user: ObjectId,
  track: ObjectId,
  datetime: String (datetime ISOString)
  }  
  ```

{user: ObjectId} - id пользователя открывший сессию

