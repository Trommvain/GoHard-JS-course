/**
 * Задача 3.
 *
 * Напишите функцию `createArray`, которая будет создавать массив с заданными значениями.
 * Первым параметром функция принимает значение, которым заполнять массив.
 * А вторым — количество элементов, которое должно быть в массиве.
 *
 * Генерировать ошибки, если:
 * - При вызове функции не было передано два аргумента;
 * - В качестве первого аргумента были переданы не число, не строка, не объект и не массив;
 * - В качестве второго аргумента был передан не число.
 */

// Решение

function createArray(item, amount) {
    if (arguments.length !== 2) throw new Error('must be 2 arguments');
    if (typeof item !== 'number' &&
        typeof item !== 'string' &&
        typeof item !== 'object'
        ) throw new Error('invalid array entry');
    if (typeof amount !== 'number') throw new Error('amount of array entries must be a number');

    const array = new Array(amount);
    array.fill(item);

    return array;
}

const result = createArray('x', 5);

console.log(result); // [ x, x, x, x, x ]
