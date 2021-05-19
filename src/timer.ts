import App from './app';

const StartGame = document.getElementById('btnStart');
const h4 = document.getElementsByTagName('h4')[0];
let seconds = 0;
let minutes = 0;
let hours = 0;

StartGame?.addEventListener('click', function start() {
  const main = document.getElementById('main');
  main!.style.display = 'none';
  const stopGame = document.getElementById('btnStop');
  stopGame!.style.display = 'flex';
  const startGame = document.getElementById('btnStart');
  startGame!.style.display = 'none';
  const timerDiv = document.getElementById('timerDiv');
  timerDiv!.style.display = 'flex';
  let stopBtnEx = true;
  function add() {
    if (!stopBtnEx) return false;
    seconds += 1;
    if (seconds >= 60) {
      seconds = 0;
      minutes += 1;
      if (minutes >= 60) {
        minutes = 0;
        hours += 1;
      }
    }
    let string = '';
    if (hours) {
      if (hours > 9) {
        string += `${hours}:`;
      } else {
        string += `0${hours}:`;
      }
    } else {
      string += `00:`;
    }

    if (minutes) {
      if (minutes > 9) {
        string += `${minutes}`;
      } else {
        string += `0${minutes}`;
      }
    } else {
      string += `00`;
    }

    if (seconds) {
      if (seconds > 9) {
        string += `:${seconds}`;
      } else {
        string += `:0${seconds}`;
      }
    } else {
      string += `:00`;
    }

    h4.textContent = string;

    timer();
    return false;
  }
  function timer() {
    setTimeout(add, 997.5);
  }
  timer();

  const secondPage = document.getElementById('secondPage');
  secondPage?.classList.add('first_item');
  const liSecondPage = document.getElementById('li_secondPage');
  liSecondPage?.classList.add('first_page');
  liSecondPage?.classList.remove('cursor');
  const liFirstPage = document.getElementById('li_firstPage');
  liFirstPage?.classList.remove('cursor');
  liFirstPage?.classList.remove('first_page');
  const firstPage = document.getElementById('firstPage');
  firstPage?.classList.remove('first_item');

  stopGame?.addEventListener('click', () => {
    if (seconds < 10) {
      h4.textContent = `0${hours}:0${minutes}:0${seconds}`;
      if (minutes < 10) {
        h4.textContent = `0${hours}:0${minutes}:0${seconds}`;
        if (hours < 10) {
          h4.textContent = `0${hours}:0${minutes}:0${seconds}`;
        }
      }
    }

    stopBtnEx = false;
    stopGame!.style.display = 'none';
    startGame!.style.display = 'flex';
  });

  const appElement = document.getElementById('app');
  if (!appElement) throw Error('App root element not found');

  return new App(appElement).start();
});
