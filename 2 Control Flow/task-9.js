// # Задача 9

// Отсортируйте массив по убыванию.

// Использовать встроенные методы массивов — нельзя.

// ```javascript
// const arr = [1, 2, 3, 4, 5, 6];
//  [6,5,4,3,2,1]
// ```

const array = [1, 2, 3, 4, 5, 6];
const len = array.length;

for (let i = 0; i < len; i++) {
    let min = array[i];
    for (let j = i + 1; j < len; j++) {
        if (array[j] > min) {
            let temp = array[i];
            min = array[j];
            array[i] = min;
            array[j] = temp;
        }
    }
}

console.log(array);
