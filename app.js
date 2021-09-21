const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const item = document.createElement('li');
item.innerHTML = '<button class="time-btn" data-time="45"> 45 сек </button>'

timeList.append(item)
const colors = [
    'linear-gradient(229.99deg, #11DEE9 -26%, #017E8B 145%)',
    'linear-gradient(215.32deg, #F90306 -1%, #9E0706 124%)',
    'linear-gradient(221.87deg, #8308EA 1%, #5305AF 128%)',
    'linear-gradient(220.16deg, #FFE101 -8%, #F39102 138%)',
    'linear-gradient(220.16deg, #73f5d7 -8%, #0000fc 138%)',
    'linear-gradient(220.16deg, #cd0aa0 -8%, #5f3694 138%)',
    'linear-gradient(-290.16deg, #4cff09 -8%, #e3d270 138%)'
]
let time = 0;
let score = 0;

startBtn.addEventListener('click', event=>{
    event.preventDefault()
    screens[0].classList.add('up')
})
timeList.addEventListener('click', event=>{
    if (event.target.classList.contains('time-btn')){
      time =  parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
      startGame()
    }
})
board.addEventListener('click', event=>{
    if (event.target.classList.contains('circle')){
        score++;
        event.target.remove()
        createRandomCircle()
    }
})
function startGame(){
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime(){
    if(time === 0){
        finishGame()
    }else {
        let current = --time;
        if (current< 10){
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value){
    timeEl.innerHTML = `00:${value}`
}
function finishGame(){
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span><h1>`
}

function createRandomCircle(){
    const circle = document.createElement('div');
    circle.classList.add('circle');
    const size = getRandomNumber(10, 60);
    const {width, height}= board.getBoundingClientRect();
    const x = getRandomNumber(0, width-size);
    const y = getRandomNumber(0, height-size);
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    console.log( (circle.style.width = x), (circle.style.height = y))
    console.log(  )
    circle.style.background = colors[Math.round(Math.random() * colors.length)]
    circle.style.top = `${x}px`;
    circle.style.left = `${y}px`;
    board.append(circle);
}

function getRandomNumber(min, max){
   return  Math.round(Math.random() * (max - min) + min)
}