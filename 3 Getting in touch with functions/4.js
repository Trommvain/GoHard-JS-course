/**
 * Задача 4.
 *
 * Сделайте функцию `f`, которая принимает параметром число от 1 до 7,
 * а затем возвращает день недели на русском языке.
 *
 * Условия:
 * - Функция принимает один параметр;
 * - Функция содержит проверку входного параметра на тип number.
 * - Входной параметр должен быть числом от 1 до 7.
 */

// Решение

function f(day) {
    if (typeof day !== 'number') throw new Error('parameter type is not a Number')
        else if (day < 1 || day > 7) throw new Error('parameter should be in the range of 1 to 7')
            else {
                switch (day) {
                    case 1: return 'Понедельник';
                    case 2: return 'Вторник';
                    case 3: return 'Среда';
                    case 4: return 'Четверг';
                    case 5: return 'Пятница';
                    case 6: return 'Суббота';
                    case 7: return 'Воскресенье';
                }
            }
}

/* не удалять */
f(1); // Воскресенье
f(2); // Понедельник
f(8); // Error: parameter should be in the range of 1 to 7
f('1'); // Error: parameter type is not a Number
/* не удалять */