/**
 * Задача 4.
 *
 * Вручную создать имплементацию функции `some`.
 * Логика работы ручной имплементации должна быть такой-же,
 * как и у встроенного метода.
 *
 * Генерировать ошибки, если:
 * - При вызове функции не было передано два аргумента;
 * - В качестве первого аргумента был передан не массив;
 * - В качестве второго аргумента была передана не функция.
 */

const array = [1, 2, 'Добро пожаловать.', 4, 5, 6];

// Решение

function some(array, callback) {
    if (arguments.length !== 2) throw new Error('must be 2 arguments');
    if (!Array.isArray(array)) throw new Error('first parameter must be an array');
    if (typeof callback !== 'function') throw new Error('second parameter must be a function');

    let isTrue = false;

    for (let i = 0; i < array.length; i++) {
        isTrue = callback(array[i], i, array);
        if (isTrue) break;
    }

    return isTrue;
}

const result = some(array, function(item, i, arrayRef) {
    console.log(item); // элемент массива
    console.log(i); // индекс элемента
    console.log(arrayRef); // ссылка на обрабатываемый массив

    return typeof item === 'string';
});

console.log(result); // true
