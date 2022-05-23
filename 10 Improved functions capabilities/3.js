/**
 * Задача 3.
 *
 * Улучшите имплементацию функции calculate() и назовите её calculateAdvanced().
 * Если на каком-то из вызовов функция-коллбек возбудила ошибку — отловите и сохраните её.
 *
 * После отлова ошибки перейдите к выполнению следующего коллбека.
 *
 * Улучшенная функция calculateAdvanced() должна возвращать объект с двумя свойствами: `value` и `errors`:
 * - свойство `value` содержит результат вычисления всех функций из цепочки;
 * - свойство `errors` содержит массив с объектами, где каждый объект должен обладать следующими свойствами:
 *     - index — индекс коллбека, на котором ошибка была возбуждена;
 *     - name — имя ошибки;
 *     - message — сообщение ошибки.
 *
 * Если во время выполнения функции-коллбека возникла ошибка, результат выполнения она не вернёт.
 *
 * Поэтому, для продолжения цепочки выполнения
 * необходимо брать результат последней успешно выполненной функции-коллбека.
 *
 * Генерировать ошибки если:
 * - Любой из аргументов не является функцией.
 */

// Решение

function calculateAdvanced(...funcs) {
    const results = [];
    const errors = [];

    if (funcs.some(func => typeof func !== 'function')) throw new Error('parameters must be functions');

    for (let index = 0; index < funcs.length; index++) {
        let result = results.length == 0 ? null : results[results.length-1];
        try {
            result = funcs[index](result);
            if(typeof result === 'undefined') throw new Error(`function at index ${index} did not return any value`);
            results.push(result);
        }
        catch(err) {
            const { name, message } = err;
            errors.push({ index, name, message });
        }
    }

    return {
        value: results[results.length - 1],
        errors,
    };

}

const result = calculateAdvanced(
    () => {},
    () => {
        return 7;
    },
    () => {},
    prevResult => {
        return prevResult + 4;
    },
    () => {
        throw new RangeError('Range is too big.');
    },
    prevResult => {
        return prevResult + 1;
    },
    () => {
        throw new ReferenceError('ID is not defined.');
    },
    prevResult => {
        return prevResult * 5;
    },
);

console.log(result);

// Функция вернёт:
// { value: 60,
//     errors:
//      [ { index: 0,
//          name: 'Error',
//          message: 'callback at index 0 did not return any value.' },
//        { index: 2,
//          name: 'Error',
//          message: 'callback at index 2 did not return any value.' },
//        { index: 4, name: 'RangeError', message: 'Range is too big.' },
//        { index: 6,
//          name: 'ReferenceError',
//          message: 'ID is not defined.' } ] }
