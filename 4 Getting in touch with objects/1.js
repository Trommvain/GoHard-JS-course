/**
 * Задача 1.
 *
 * Создайте объект `person` у которого будет одно свойство `salary`.
 * При чтении этого свойства должна возвращаться строка с текстом.
 * Если до конца месяца осталось больше чем 20 дней — возвращается строка `good salary`, а если нет — `bad salary`
 */

const person = {
    get salary() {
        let now = new Date();
        let monthLength = 31;
        switch ( now.getMonth() ) {
            case 1: monthLength = 28; break;
            case 3: 
            case 5:
            case 8:
            case 10: monthLength = 30; break;
        }
        return ( (monthLength - now.getDate()) > 20 ) ? 'good salary' : 'bad salary';
    }
};

console.log(person.salary);
