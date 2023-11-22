// Элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// Список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// Преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// Отрисовка карточек
const display = () => {
    fruitsList.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    const li = document.createElement('li');
    if (fruits[i].color === "фиолетовый"){
        li.className = "fruit__item fruit_violet";
    }
    if (fruits[i].color === "зеленый"){
        li.className = "fruit__item fruit_green";
    }
    if (fruits[i].color === "розово-красный"){
        li.className = "fruit__item fruit_carmazin";
    }
    if (fruits[i].color === "желтый"){
        li.className = "fruit__item fruit_yellow";
    }
    if (fruits[i].color === "светло-коричневый"){
        li.className = "fruit__item fruit_lightbrown";
    }

    fruitsList.appendChild(li);

    const div = document.createElement('div');
    div.className = "fruit__info";

    let divIndex = document.createElement('div');
    divIndex.innerHTML = "index: " + [i];
    div.appendChild(divIndex);

    let divKind = document.createElement('div');
    divKind.innerHTML = "kind: " + fruits[i].kind;
    div.appendChild(divKind);

    let divColor = document.createElement('div');
    divColor.innerHTML = "color: " + fruits[i].color;
    div.appendChild(divColor);

    let divWeight = document.createElement('div');
    divWeight.innerHTML = "weight: " + fruits[i].weight;
    div.appendChild(divWeight);

    li.appendChild(div);

  }
};

// Первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// Генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let mixFruits = [...fruits];
  while (fruits.length > 0) {
    let randFruits = getRandomInt(0, fruits.length - 1);
    result.push(fruits[randFruits]);
    fruits.splice(randFruits,1);
  }

  fruits = result;
// Проверка перемешивания
  if (fruits.every((el, index) => el === mixFruits[index])) {
     alert("Не удалось перемешать! Попробуйте ещё раз.")
     console.log("Не удалось перемешать! Попробуйте ещё раз.")
   }
   else {
     console.log("не повторяется")
   }
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// Фильтрация массива
const min = document.querySelector('.minweight__input');
const max = document.querySelector('.maxweight__input');
const filterFruits = () => {
  if (isNaN(min.value) || isNaN(max.value)) {
    alert('Вес должен быть введен цифрами')
    min.value = '';
    max.value = '';
    return fruits;
  }
  fruits = fruits.filter((item) => {
   parseInt(min.value) > parseInt(max.value) ? [max.value, min.value]=[min.value,max.value] : fruits;
   return (item.weight >= parseInt(min.value)) && (item.weight <= parseInt(max.value));
  });
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  const priority = ['фиолетовый', 'зеленый', 'розово-красный', 'желтый', 'светло-коричневый'];
  return priority.indexOf(a.color) > priority.indexOf(b.color) ? true : false;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    const n = arr.length;
     for (let i = 0; i < n - 1; i++){
      for (let j = 0; j < n -1 -i; j++){
        if (comparation(arr[j], arr[j+1])){
          let temp = arr[j+1];
          arr[j+1] = arr[j];
          arr[j] = temp;
        }
      }
     }
  },

  quickSort(arr, comparation) {
    if (arr.length <= 1) {
      return arr;
  }
  const pivot = arr[arr.length - 1];
  const leftList = [];
  const rightList = [];
  for (let i = 0; i <= arr.length - 1; i++) {
    if (arr[i] < pivot) {
      leftList.push(arr[i]);
    } else {
      rightList.push(arr[i])
      }
  }

  return [...this.quickSort(leftList,comparation), pivot, ...this.quickSort(rightList,comparation)];
  },

  // Выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// Инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  sortKindLabel.textContent === 'bubbleSort' ? sortKindLabel.textContent = 'quickSort' : sortKindLabel.textContent = 'bubbleSort';
});

sortActionButton.addEventListener('click', () => {
  sortTimeLabel.textContent = 'sorting...';
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  console.log(kindInput.value, colorInput.value, weightInput.value);
  let newFruits = {kind : kindInput.value, color : colorInput.value, weight : weightInput.value};
  (isNaN(weightInput.value)) ? alert('Вес должен быть введен цифрами') : (kindInput.value == '')  || (weightInput.value = '') ? alert('Заполнены не все поля') : fruits.splice(fruits.length, 1, newFruits);
  display();
    kindInput.value = '';
    weightInput.value = '';
});