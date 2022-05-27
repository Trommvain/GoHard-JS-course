// # Задача 2

// Улучшите класс `Customers` добавив функцию генератор.

// **Обратите внимание**:

// 1. Класс `Customers` после этого должен работать **идентично** предыдущей задаче.

// Решение

class Customers {

    customers = [];

    add(person) {
        if (typeof person !== 'object') throw new Error('parameter must be an object');
        if(!person.name) throw new Error('missing name');
        if(typeof person.name !== 'string') throw new Error('name must be a string type');
        if (person.verified && typeof person.verified !== 'boolean') throw new Error('verified value must be a boolean type');
        if (Object.keys(person).length > 2) throw new Error('too many parameters');
        this.customers.push(person);
    }

    #getVerified() {
        const verified = [];
        for (let i = 0; i < this.customers.length; i++) {
            if(this.customers[i].verified === true) {
                verified.push(this.customers[i]);
            }
        }
        return verified;
    }

    *[Symbol.iterator]() {
        const verifiedCustomers = this.#getVerified();
        for (let customer of verifiedCustomers) {
            yield customer;
        }
    }
}

const customers = new Customers();
customers.add({name: 'Alex'});
customers.add({name: 'Victor'});
customers.add({name: 'Marcus'});
customers.add({name: 'Andrii', verified: true});
customers.add({name: 'Marco', verified: true});
customers.add({name: 'Oliver'});
customers.add({name: 'Lisa', verified: true});
customers.add({name: 'John'});
customers.add({name: 'Ivan', verified: true});

for (const customer of customers) {
    console.log(customer);
}

// В консоли будет
// { name: 'Andrii', verified: true }
// { name: 'Marco', verified: true }
// { name: 'Lisa', verified: true }
// { name: 'Ivan', verified: true }
