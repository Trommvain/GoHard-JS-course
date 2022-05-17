// # Задача 10

// Отсортируйте массив по возрастанию.

// Использовать встроенные методы массивов — нельзя.

// ```javascript
// const arr = [6, 5, 4, 3, 2, 1];
//  [1,2,3,4,5,6]
// ```

const array = [6, 5, 4, 3, 2, 1];
const len = array.length;

for (let i = 0; i < len; i++) {
    let max = array[i];
    for (let j = i + 1; j < len; j++) {
        if (array[j] < max) {
            let temp = array[i];
            max = array[j];
            array[i] = max;
            array[j] = temp;
        }
    }
}

console.log(array);
