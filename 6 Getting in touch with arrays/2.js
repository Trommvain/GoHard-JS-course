/**
 * Задача 2.
 *
 * Вручную создать имплементацию функции `filter`.
 * Логика работы ручной имплементации должна быть такой-же,
 * как и у встроенного метода.
 *
 * Генерировать ошибки, если:
 * - При вызове функции не было передано два аргумента;
 * - В качестве первого аргумента был передан не массив;
 * - В качестве второго аргумента была передана не функция.
 */

const array = ['Доброе утро!', 'Добрый вечер!', 3, 512, '#', 'До свидания!'];

// Решение

function filter(array, callback) {
    if (arguments.length !== 2) throw new Error('must be 2 arguments');
    if (!Array.isArray(array)) throw new Error('first parameter must be an array');
    if (typeof callback !== 'function') throw new Error('second parameter must be a function');

    const newArray = [];

    for (let i = 0; i < array.length; i++) {
        const isTrue = callback(array[i], i, array);
        if (isTrue) newArray.push(array[i]);
    }

    return newArray;
}

const filteredArray = filter(array, function(item, i, arrayRef) {
    console.log(item); // элемент массива
    console.log(i); // индекс элемента
    console.log(arrayRef); // ссылка на обрабатываемый массив

    return item === 'Добрый вечер!';
});

console.log(filteredArray); // ['Добрый вечер!']
