// # Задача 4

// Создайте класс `Countries` который при создании своего экземпляра принимает один параметр в с типом строка. Этот параметр будет служить API эндпоинтом.

// У класса `Countries` должен быть один метод `send` который должен возвращать промис.

// А принимает метод `send` один параметр который должен быть по типу `number` и который потом будет использоваться как значение для `GET` query-параметра `size`.

// **Обратите внимание**:

// 1. Метод `send` должен возвращать промис.
// 2. Использование `async & await` внутри класса **запрещено**.
// 3. Использование посторонних библиотек кроме библиотеки `fetch` **запрещено**
// 4. Если сервер ответил статус кодом `200` промис **должен** возвращать массив который содержит список объектов-стран.
// 5. В том случае если сервер ответил статус кодом не `200` промис **должен** генерировать ошибку с текстом `We have error, status code: ${statusCode}`
// 6. Генерировать ошибку если `url` по типу не строка.
// 7. Генерировать ошибку если методу `send` передать по типу не число.

// **В результате такой код должен работать**:

const get = require('./node_modules/fetch/lib/fetch').fetchUrl;
let url = 'http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c';

class Movies {
    constructor(url) {
        if (typeof url !== 'string') throw new Error('url must be a string type');
        this.url = url;
    }

    send(page) {
        if (typeof page !== 'number') throw new Error('page must be a number');
        return new Promise( (resolve, reject) => {
            url += `&page=${page}`;
            get(url, (error, meta, body) => {
                if(error) return reject(`We have error: ${error.message}`);
                const movies = JSON.parse(body);
                const titles = [];
                for (let movie of movies.results) {
                    titles.push(movie.title);
                }
                resolve(titles);
            });
        });
    }

}

const movies = new Movies(url);

(async() => {
    try {
        const data = await movies.send(2);
        console.log(data); // массив стран
    } catch (error) {
        console.log(error);
    }
})();