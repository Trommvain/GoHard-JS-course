// # Задача 2

// Улучшить класс `DB` из предыдущей задачи.

// -   Добавить метод `find`, который будет возвращать массив пользователей которые удовлетворяют условие переданное в качестве параметра
// -   Генерировать ошибку, если query не валидный
// -   Поля `name` и `country` ищут 100% совпадение
// -   Поля `age` и `salary` принимают объект в котором должны быть или 2 параметра `min` и `max` или хотя-бы один из них
// -   Возвращать пустой массив если не удалось найти пользователей которые удовлетворяют объект запроса

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

    find(query) {
        if (typeof query !== 'object') throw new Error('query parameter must be an object');
        if (!Object.keys(query).includes('name') &&
            !Object.keys(query).includes('age') &&
            !Object.keys(query).includes('country') &&
            !Object.keys(query).includes('salary')
            ) throw new Error('invalid query');
        if (Object.keys(query).includes('name') && typeof query.name !== 'string')
            throw new Error('query name parameter must be a string');
        if (Object.keys(query).includes('country') && typeof query.country !== 'string')
            throw new Error('query country parameter must be a string');
        if (Object.keys(query).includes('age') &&
            !(typeof query.age !== 'object' ||
            (Object.keys(query.age).includes('min') || Object.keys(query.age).includes('max')) &&
            (typeof query.age.min === 'number' || typeof query.age.max === 'number')))
            throw new Error('missing or invalid type of age query parameter');
        if (Object.keys(query).includes('salary') &&
            !(typeof query.salary !== 'object' ||
            (Object.keys(query.salary).includes('min') || Object.keys(query.salary).includes('max')) &&
            (typeof query.salary.min === 'number' || typeof query.salary.max === 'number')))
            throw new Error('missing or invalid type of salary query parameter');
        if (query.salary.min >= query.salary.max)
            throw new Error('minimal salary can\'t be more than or equal to maximal');

        const users = [];
        let userFlag = 0;

        for (let id of this.privateData.keys()) {
            let user = this.privateData.get(id);
            for (let key of Object.keys(query)) {
                if(key !== 'age' && key !== 'salary') {
                    if (query[key] === user[key]) userFlag++;
                }
                else if (key === 'age') {
                    if (query.age.min && query.age.max) {
                        if (user.age >= query.age.min && user.age <= query.age.max) userFlag++;
                    }
                        else if (query.age.min) {
                            if (user.age >= query.age.min) userFlag++;
                        }
                            else if (user.age <= query.age.max) userFlag++;
                }
                else {
                    if (query.salary.min && query.salary.max) {
                        if (user.salary >= query.salary.min && user.salary <= query.salary.max) userFlag++;
                    }
                        else if (query.salary.min) {
                            if (user.salary >= query.salary.min) userFlag++;
                        }
                            else if (user.salary <= query.salary.max) userFlag++;
                }
            }
            if (Object.keys(query).length === userFlag) users.push(user);
            userFlag = 0;
        }
        return users;
    }
}

const db = new DB();

const person = {
    name: 'Pitter',
    age: 21,
    country: 'ua',
    salary: 500
};

const person2 = {
    name: 'John',
    age: 44,
    country: 'us',
    salary: 5000
};

db.create(person);
db.create(person2);

const query = {
    country: 'ua',
    age: {
        min: 21
    },
    salary: {
        min: 300,
        max: 600
    }
};

const customers = db.find(query); // массив пользователей
console.log(customers);
