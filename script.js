const time = document.querySelector('.time');
const weekDay = document.querySelector('.day');
const greetings = document.querySelector('.greetings');
const input = document.querySelector('.name')
const btnChangeTime = document.querySelector('.changeTime');
const date = document.querySelector('.date');
const body = document.querySelector('.base');
const arrowLeft = document.querySelector('.arrow_left');
const arrowRight = document.querySelector('.arrow_right');
const inputCity = document.querySelector('.town');
const temperature = document.querySelector('.temperature');
const humid = document.querySelector('.hum');
const weatherIcon = document.querySelector('.icon_weather');
const descript = document.querySelector('.description');
const wind = document.querySelector('.wind')
const changeDegree = document.querySelector('.change_degree')
let measure = 'metric' ;

let is12hFormat = true; //вспомнить..

const currentDate = new Date( );    //вид написания даты
  const options = {
    year: 'numeric',
    day: 'numeric',
    month: 'long',
    weekday: 'long',
 } 

date.textContent = currentDate;

const getWeather = (city) => {                    //получаем погоду в городе 
  const weather = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=2019551c3dcff13aaac860bbee749689&units=${measure}`)
      
.then(function(result) {
  console.log(result)
  return result.json()
  
}).then(function(result2) {
  const temp = result2.main.temp;
  temperature.textContent = temp;
  const humidity = result2.main.humidity;
  humid.textContent = humidity;
  const description = result2.weather[0].description;
  descript.textContent = description;
  
  weatherIcon.classList.add(`owf-${result2.weather[0].id}`);
  
  const windSpeed = result2.wind.speed;
  wind.textContent = windSpeed; 
  console.log(result2)

})
};
changeDegree.addEventListener('click',changeUnit);
function changeUnit() {
   if(measure == 'metric') {
     measure = 'imperial'
     changeDegree.textContent = '°F';
   } else {
    measure = 'metric'
     changeDegree.textContent ='°C';
  };
  getWeather(inputCity.value);
}

function showtime() {             // получаем время
    const newDate =new Date();
    let partOfDay = is12hFormat ? newDate.getHours() <= 12 ? 'AM' : 'PM' : '';
    const currentHours = is12hFormat 
        ? newDate.getHours()> 12 
            ? newDate.getHours() - 12 
            : newDate.getHours() 
            : newDate.getHours();
    const minutFiller = newDate.getMinutes()<10 ? `0${newDate.getMinutes()}` :newDate.getMinutes();   // добавляем 0 в мин
    const secondsFiller = newDate.getSeconds()<10 ? `0${newDate.getSeconds()}` :newDate.getSeconds();
    time.textContent = `${currentHours}:${minutFiller}:${secondsFiller}     ${partOfDay}`;  // вид записи времени
    date.textContent = currentDate.toLocaleDateString('en',options) ; // возвращает строку с языкозависимым представлением части с датой в этой дате
    
   greetings.textContent = showGreeting(newDate);
};
setInterval(showtime, 1000);

function getTimeOfDay() {                     //определение времени суток
 const dateOfDay = new Date();
 const hours = dateOfDay.getHours();
if (hours >= 6 & hours < 12) {return  'morning'}
else if (hours >= 12 & hours < 18) {return 'afternoon'}
else if (hours>= 18 & hours < 24) {return 'evening'}
else if (hours == 24 || hours < 6) {return 'night'}
};

function showGreeting() {                      //составление приветствия
  return `${'Good'} ${getTimeOfDay()},`
}

btnChangeTime.addEventListener('click',() => {            // изменение формата даты
    is12hFormat = !is12hFormat; 
});


inputCity.addEventListener('input',setLocalStorageCity);//фрагмент получает доступ к локальному Storageобъекту текущего домена и добавляет к нему элемент данных 
 function setLocalStorageCity() {    //получаем город
  localStorage.setItem('myCity',inputCity.value)
 };
inputCity.addEventListener('blur', function() {getWeather(inputCity.value)});  // при потере фокуса
inputCity.addEventListener('keyup', function(event) { event.keyCode == 13 && getWeather(inputCity.value) })  // при нажатии клавиши enter
  
input.addEventListener('input',setLocalStorage);

function setLocalStorage() {   // получает доступ, инпут=имя
  localStorage.setItem('myName', input.value)
}

function getLocalStorage() {    //сохраниние имени и города  
  const myName = localStorage.getItem('myName');
  const myCity = localStorage.getItem('myCity');
    if(myName) {
    input.value =myName;
  }
  if(myCity) {
    inputCity.value = myCity;
   };
}
window.addEventListener('load',() => {   //при перезагрузке  сохраняется введенный город
  getLocalStorage();
  getWeather(inputCity.value);
});

let number = Math.floor(Math.random() * 20) + 1;  //получение случайного числа
function getCorrectNumber(num) {  //преобразование случайного числа
 if(num < 10) {
  return `${0}${number}`;
 } else {
  return number
 }
}

function setBg() {   //вызов бэкграунда 
  const part = getTimeOfDay()
  body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${part}/${getCorrectNumber(number)}.jpg')`

};
 setBg() 

 function loadImage(part,number) {
  const img = new Image()
  img.src =`https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${part}/${getCorrectNumber(number)}.jpg`
  img.addEventListener('load', function(){  //при загрузке
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${part}/${getCorrectNumber(number)}.jpg')`
  })
 };

arrowLeft.addEventListener('click',getSlidePrev); //при клике на стрелку вызвать предыдущий слайд
function getSlidePrev () {  //получение предыдущего слайда
    const part = getTimeOfDay()
    if(number>1){
      number = number -1; 
      } else {
        number= 20;
      }
    loadImage(part,number)
}

arrowRight.addEventListener('click',getSlideNext); //при клике на стрелку вызвать переключение след слайда
function getSlideNext () {      //получение следующего слайда
  const part = getTimeOfDay()
  if(number < 20)
{number = number + 1}  
else { number = 1
}
loadImage(part,number)
}









        
