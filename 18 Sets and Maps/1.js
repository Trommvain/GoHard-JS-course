// # Задача 1

// Создать класс `DB` который будет имплементировать `CRUD` модель.

// -   В качестве структуры данных использовать `Map`.
// -   Метод `create`:
// -   -   принимает объект и валидирует его, в случае невалидности объекта – генерирует ошибку.
// -   -   возвращает `id`
// -   -   при создании пользователя генерирует уникальный `id`, который является ключом для объекта пользователя в структуре `Map`
// -   Метод `read`:
// -   -   принимает идентификатор пользователь
// -   -   если такого пользователя нет возвращать `null`
// -   -   если есть — возвращать объект пользователя с полем `id` внутри объекта.
// -   -   если в метод `read` передать не строку, или не передать параметр вообще — генерировать ошибку.
// -   Метод `readAll`:
// -   -   возвращает массив пользователей
// -   -   генерировать ошибку если в метод `readAll` передан параметр
// -   Метод `update`:
// -   -   обновляет пользователя
// -   -   принимает 2 обязательных параметра
// -   -   генерирует ошибку если передан несуществующий `id`
// -   -   генерирует ошибку если передан `id` с типом не строка
// -   -   генерирует ошибку если второй параметр не валидный
// -   Метод `delete`:
// -   -   удаляет пользователя
// -   -   Генерировать ошибку если передан в метод `delete` несуществующий или невалидный `id`

class DB {
    privateData = new Map();
    id = 0;

    create(person) {
        if (typeof person !== 'object') throw new Error('create parameter must be an object');
        if (!person.name || typeof person.name !== 'string') throw new Error('invalid or missing name');
        if (!person.age || typeof person.age !== 'number') throw new Error('invalid or missing age');
        if (!person.country || typeof person.country !== 'string') throw new Error('invalid or missing country');
        if (!person.salary || typeof person.salary !== 'number') throw new Error('invalid or missing salary');

        this.privateData.set(++this.id, person);
        return this.id.toString();
    }

    read(id) {
        if (!id || typeof id !== 'string') throw new Error('invalid id');
        if (!this.privateData.has(+id)) return null;
            else return this.privateData.get(+id);
    }

    readAll() {
        if (!arguments) throw new Error('readAll must be invoked without parameters');
        let usersArray = [];
        for (let user of this.privateData.values()) {
            usersArray.push(user);
        }
        return usersArray;
    }

    update(id, prop) {
        if (arguments.length !== 2) throw new Error('update must have 2 parameters');
        if (typeof id !== 'string') throw new Error('id must be a string type');
        if (!this.privateData.has(+id)) throw new Error('no such id');
        if (typeof prop !== 'object') throw new Error('second parameter must be an object');
        if (!prop.hasOwnProperty('name') &&
            !prop.hasOwnProperty('age') &&
            !prop.hasOwnProperty('country') &&
            !prop.hasOwnProperty('salary'))
            throw new Error(`key \"${Object.keys(prop)[0]}\" does not exist`);
        
        let propName = Object.keys(prop)[0];
        if(propName === 'name' && typeof prop[propName] !== 'string') throw new Error('name must be a string type');
        if(propName === 'age' && typeof prop[propName] !== 'number') throw new Error('age must be a number');
        if(propName === 'country' && typeof prop[propName] !== 'string') throw new Error('country must be a string type');
        if(propName === 'salary' && typeof prop[propName] !== 'number') throw new Error('salary must be a number');

        let personObj = this.privateData.get(+id);
        personObj[propName] = prop[propName];
        this.privateData.set(+id, personObj);
    }

    delete(id) {
        if (!id) throw new Error('missing id');
        if (typeof id !== 'string') throw new Error('id must be a string type');
        if (!this.privateData.has(+id)) throw new Error('no such id');

        this.privateData.delete(+id);
    }
}

const db = new DB();

const person = {
    name: 'Pitter', // обязательное поле с типом string
    age: 21, // обязательное поле с типом number
    country: 'ua', // обязательное поле с типом string
    salary: 500 // обязательное поле с типом number
};

const id = db.create(person);
const customer = db.read(id);
const customers = db.readAll(); // массив пользователей
db.update(id, { age: 22 }); // id
db.delete(id); // true
