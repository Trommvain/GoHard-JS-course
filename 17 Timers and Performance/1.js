/**
 * Задача 1.
 *
 * Напишите функцию postpone, которая выводит в консоль счетчик с задержкой.
 *
 * Функция принимает 3 параметра:
 * - Первый параметр `start` — число, c которого начнется отсчет;
 * - Второй параметр `end` — верхний порог, до которого будет идти отсчет;
 * - Третий параметр `delay` — это время в `мс` между выводами.
 *
 * Условия:
 * - Функция принимает три параметра;
 * - Функция содержит валидацию входных параметров на тип number;
 * - Обязательно использование таймера setTimeout и цикла for;
 * - Функция должна уметь считать в обе стороны.
 */

// Решение

function postpone(start, end, delay) {
    if (arguments.length !== 3) throw new Error('function must recieve 3 parameters');
    if (typeof start !== 'number' && 
        typeof end !== 'number' && 
        typeof delay !== 'number')
        throw new Error('parameters must be numbers');
    if (start < end) {
        for (let i = start; i <= end; i++) {
            setTimeout(() => console.log(i), delay * i);
        }
    }
    else if (start > end) {
        let multiplier = 0;
        for (let i = start; i >= end; i--) {
            multiplier++;
            setTimeout(() => console.log(i), delay * multiplier);
        }
    }
    else setTimeout(() => console.log(start), delay);
}

postpone(1, 3, 1000);
// 1
// 2
// 3
// postpone(3, 1, 1000);
// 3
// 2
// 1