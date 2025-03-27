// Откровение, что и здесь, в js, можно создавать лаконичное описание функций
// Второе откровение, что этот язык оказался пока что довольно прост в понимании и написании
// Главное не складывать числа


/**
 * Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
 * @param {number} number - Проверяемое число
 * @returns {boolean} - И так понятно
 */
function isInteger(number) {
    return number === number >> 0;
}


/**
 * Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
 * @returns {number[]} - Нужный нам массив чётных чисел
 */
function even() {
    const numbers = [];
    for (let i = 2; i <= 20; i += 2) {
        numbers.push(i);
    }
    return numbers;
}


/**
 * Напишите функцию, считающую сумму чисел до заданного используя цикл
 * @param {number} num - Заданное число окончания рассёта
 * @returns {number} - Сумма чисел от 1 до n
 */
function sumTo(num) {
    if (num < 0) {
        return null;
    }

    const sum = (num * (num + 1)) / 2;
    return sum;
}


/**
 * Напишите функцию, считающую сумму чисел до заданного используя рекурсию
 * @param {number} num - Заданное число для рекурсии
 * @param {number} sumNum - Рассчёт суммы
 * @returns {number} - Сумма
 */
function recSumTo(num, sumNum = 0) {
    if (num < 0) {
      return null;
    }
    // Особое максимально строгое сравнение ===, чтоб уж точно знать, что они абсолютно идентичны
    if (num === 1) {
        return sumNum + 1;
    }
    if (num === 0 ) {
      return 1;
    }
    // запускаем рекурсию вновь, где-то убавляя, где-то прибавляя на 1
    return recSumTo(num - 1, sumNum + num);
}
  

/**
 * Напишите функцию, считающую факториал заданного числа
 * @param {number} num - Заданное число
 * @param {number} sumNum - Расчётная сумма
 * @returns {number} - Факториал
 */
function factorial(n, sumNum = 1) {
    if (n < 0) {
      return null;
    }
    if (n === 0) {
      return sumNum;
    }
    // Напоминает немного прошлую задачу
    return factorial(n - 1, sumNum * n);
}


/**
 * Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
 * @param {number} num - Проверяемое число
 * @returns {boolean} - Результат true или false
 */
function isBinary(num) {
    if (num <= 0) {
        return false;
    }
    // Просто побитово проверяем да, или нет
    return (num & (num - 1)) === 0;
}


/**
 * Напишите функцию, которая находит N-е число Фибоначчи
 * @param {number} n - номер искомого числа
 * @returns {number} - Искомое число
 */
function fibonacci(n) {
    let res = [1, 1];
    for (let i = 2; i <= n; i++)
    {
        res.push(res[i - 2] + res[i - 1]);
    }
    return res[n - 1];
}


/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
    // Условие первое
    if (typeof operatorFn !== 'function')
    {
      return () => initialValue;
    }
    let storedValue = initialValue;
    return (newValue) => storedValue = operatorFn(storedValue, newValue);
}


/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start = 0, step = 1) {
    let curr = start;
    // Вау, целую функцию сразу написали и вернули, что-то на python-овском
    return function() {
        const result = curr;
        curr += step;
        return result;
    };
}


/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp и т.п.) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject)
{
    if (firstObject === secondObject) return true;

    if (typeof firstObject === 'number' &&
        typeof secondObject === 'number')
    {
        // Проверим ещё не пустота ли это всё, а то она сама с собой не в равенстве
        return isNaN(firstObject) && isNaN(secondObject);
    }

    if (firstObject === null || 
        typeof firstObject !== 'object' ||
        secondObject === null ||
        typeof secondObject !== 'object')
    {
        return false;
    }

    // Если это всё же массивы, то пробегаемся по каждому элементу для "глубокой" оценки
    if (Array.isArray(firstObject) &&
    Array.isArray(secondObject))
    {
        return (firstObject.length === secondObject.length &&
            firstObject.every((value, index) => deepEqual(value, secondObject[index])));
    }

    // Если один аргумент массив, а другой - обычный объект, они не равны
    if (Array.isArray(firstObject) || Array.isArray(secondObject)) return false;

    const keysA = Object.keys(firstObject), keysB = Object.keys(secondObject);
    // Элементы
    return (keysA.length === keysB.length && keysA.every((key) => keysB.includes(key) &&
            deepEqual(firstObject[key], secondObject[key])));
}

   
module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
