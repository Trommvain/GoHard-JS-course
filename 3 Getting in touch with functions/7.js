/**
 * Задача 7.
 *
 * Сделайте функцию `getDivisors`, которая параметром принимает число и возвращает массив его делителей (чисел, на которое делится данное число начиная от 1 и заканчивая самим собой).
 *
 * Условия:
 * - Входной параметр должен обладать типом number;
 * - Входной параметр должен быть больше 0.
 */

// Решение

function getDivisors(num) {
    const divs = [];
    if (typeof num !== 'number') throw new Error('parameter type is not a Number')
        else if (num <= 0) throw new Error('parameter can\'t be negative or 0')
            else {
                for (let i = 1; i <= num; i++) {
                    if (num % i === 0) divs.push(i);
                }
            }
    return divs;
}

/* не удалять */
getDivisors(12); // [1, 2, 3, 4, 6, 12]
getDivisors('Content'); // Error: parameter type is not a Number
getDivisors(0); // Error: parameter can't be a 0
/* не удалять */
