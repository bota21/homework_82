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


### `Фиктуры` <br>
Чтобы начать работу с API реализиван фикстуры. К каждой модели приложен пару данных. Чтобы запустить фикстуры нужно зайти в корневую папку:
```
cd homework_82
```
и запустить фикстуры:
```
node fixtures.js
````

### ***Аутентификация пользователя***
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
Расшифровка данных по объекту:
```
    _id: ID данного пользователя,
    username: Логин пользователя,
    token: token пользователя
```
username - должен быть уникальным.

#### POST users/sessions

Чтобы открыть сессию для пользователя, отправить запрос на endpoint:
> http://localhost:2100/users/sessions

Отправить данные в виде объекта:

```
{
    username: String,
    password: String
}
```
Если пароль или пользователь не будут найдены, вернется ошибка 'User not found' или 'Wrong password'.
При успешном запросе вернется объект в виде:

```
{
    _id: ObjectId,
    username: String,
    token: String
}
```
#### DELETE users/sessions

Чтобы закрыть сессию для пользователя, отправить запрос на endpoint:
> http://localhost:2100/users/sessions

Для успешного запроса нужно отправить в заголовке токен
```
"Authentication": token
```

#### GET /artists

Запрос на получение всех данных об исполнителях. Обязательно нужно открыть сессию. Чтобы открыть сессию нужно отправить в заголовке запросе token пользователя, например:
```
"Authentication": token
```

 При успешном запроме возвращает массив с объектами в виде:

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
Расшифровка данных по объекту:
```
    _id: ID данного исполнителя,
    title: Название исполнителя,
    image: Картинка исполнителя,
    description: Описание про исполнителя
```
Для получения всех исполнителей отправить запрос на endpoint: <br>
> http://localhost:2100/artists


#### GET /artists/:id
Обязательно нужно открыть сессию.
Для получения определенного музыканта отправить запрос на endpoint:<br>
> http://localhost:2100/artists/{artistID}
artistID - id определенного исполнителя 


#### POST /artists
Обязательно нужно открыть сессию.
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
Обязательно нужно открыть сессию.
Для изменении данных по определенному музыканту отправить запрос на endpoint:<br>
> http://localhost:2100/artists/{artistID}
artistID - id определенного исполнителя

#### DELETE /artists
Обязательно нужно открыть сессию.
Для удаления по определенного музыканта отправить запрос на endpoint:<br>
> http://localhost:2100/artists/{artistID}
artistID - id определенного исполнителя




#### GET /albums
Обязательно нужно открыть сессию.
Запрос на получение всех данных об альбомах. Возвращает массив с объектами с сортировкой по году выпуску альбомов в виде:

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
Расшифровка данных по объекту:
```
    _id: ID данного альбома,
    title: Название альбома,
    artist: ID исполнителя данного альбома
    year: Год выпуска альбома,
    cover: Картинка альбома
```
Для получения всех альбомов отправить запрос на endpoint: <br>
> http://localhost:2100/albums

Для получения определенных исполнителей по альбомам отправить запрос на endpoint:
> http://localhost:2100/albums?artist={artistID}
artistID - id определенного исполнителя


#### GET /albums/:id
Обязательно нужно открыть сессию.
Для получения определенного музыканта отправить запрос на endpoint:<br>
> http://localhost:2100/albums/{albumID}
albumID - id определенного альбома

#### POST /albums
Обязательно нужно открыть сессию.
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
Обязательно нужно открыть сессию.
Для изменении данных по определенному альбому отправить запрос на endpoint:<br>
> http://localhost:2100/albums/{albumID}
albumID - id определенного альбома

#### DELETE /albums
Обязательно нужно открыть сессию.
Для удаления по определенного альбома отправить запрос на endpoint:<br>
> http://localhost:2100/albums/{albumID}
albumID - id определенного альбома





#### GET /tracks
Обязательно нужно открыть сессию.
Запрос на получение всех данных об композициях. Возвращает массив с объектами с сортировкой по порядковому номеру композиции в альбоме в виде:

```
[
  {
    _id: ObjectId,
    title: String,
    album: ObjectId,
    long: String,
    num: String,
    youtube: String
  }
]
```
Расшифровка данных по объекту:
```
    _id: ID данной композиции,
    title: Название альбома,
    album: ID альбома,
    long: Длина композиции,
    num: Порядковый номер композиции в альбоме,
    youtube: Ссылка на ютуб
```

Для получения всех композиции отправить запрос на endpoint: <br>
> http://localhost:2100/tracks

Для получения определенных альбомов по композициям отправить запрос на endpoint:
> http://localhost:2100/tracks?album={albumID}
albumID - id определенного альбома


#### GET /tracks/:id
Обязательно нужно открыть сессию.
Для получения определенной композиции отправить запрос на endpoint:<br>
> http://localhost:2100/tracks/{trackID}
trackID - id определенной композиции


#### POST /tracks
Обязательно нужно открыть сессию.
Отправить данные в виде объекта:

```
{
    title: String,
    album: ObjectId,
    long: String,
    youtube: String
}
```
youtube - является не обязательным полем. Ссылку можно получить по адресу: https://www.youtube.com. У каждого видео есть ссылка поделиться. Нужно передать последнее значение в адресе. Например: https://youtu.be/fb1BF9B1MGQ, передаем:
```
  "youtube": "fb1BF9B1MGQ"
```

Все указанные поля обязательно должны быть заполнены кроме youtube, иначе вернется ошибка.

При успешном запросе вернется объект с данными:
```
{
    _id: ObjectId,
    title: String,
    album: ObjectId,
    long: String,
    num: String,
    youtube: String
  }
  ````

> Еndpoind для отправки сообщения: <br>
> http://localhost:2100/tracks

#### PUT /tracks/:id 
Обязательно нужно открыть сессию.
Для изменении данных по определенной композиции отправить запрос на endpoint:<br>
> http://localhost:2100/tracks/{trackID}
trackID - id определенной композиции

#### DELETE /tracks
Обязательно нужно открыть сессию.
Для удаления по определенной композиции отправить запрос на endpoint:<br>
> http://localhost:2100/tracks/{trackID}
trackID - id определенной композиции


#### GET /track_history
Запрос на получение всех данных об композициях которые были прослушаны. Обязательно должен быть передан token. Возвращает массив с объектами с сортировкой по дате прослушивания в виде:

```
[
  {
    _id: ObjectId,
    user: ObjectId,
    track: ObjectId,
    datetime: String
  } 
]
```
Расшифровка данных по объекту:
```
    _id: ID данного пользователя,
    user: ID пользователя открывший сессию,
    track: ID композиции,
    datetime: Дата прослушивания композиции пользователем


datetime - Возвращается в виде:
dd - День месяца
mm - Номер месяца в году
yyyy - Год
hh - Час
mm - Минута
```

Для получения истории прослушивания пользователя отправить запрос на endpoint: <br>
> http://localhost:2100/track_history


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
  datetime: String
  }  
  ```


> Еndpoind для отправки данных о прослушавшей композици: <br>
> http://localhost:2100/track_history