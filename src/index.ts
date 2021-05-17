import './styles.scss';
import './cards.scss';
import './assets/953818.svg';
import './assets/free-icon-cogwheel-3953263.svg';
import './assets/best.svg';
import './assets/one.svg';
import './assets/image_register.svg';
import './timer.ts';

// const body = document.getElementById('body');
// body!.innerHTML = ``;

const gray = document.getElementById('gray')!;

function show(state: string) {
  const window = document.getElementById('window')!;
  gray.style.display = state;
  window.style.display = state;
}

const btnReg = document.getElementById('btnReg');
btnReg?.addEventListener('click', () => {
  show('block');
});

const btnCancel = document.getElementById('btnCancel')!;
btnCancel.addEventListener('click', () => {
  show('none');
});

// indexedDB
let db: IDBDatabase;

const dbReq = indexedDB.open('database', 1);

dbReq.onupgradeneeded = (event) => {
  db = event.target!.result;
  db.createObjectStore('users', { autoIncrement: true });
};

// add user
const addUser = document.getElementById('addUser');

const AddUser = () => {
  const tx = db.transaction(['users'], 'readwrite');
  const store = tx.objectStore('users');
  const frstName = document.getElementsByTagName('input')[0].value;
  const lstName = document.getElementsByTagName('input')[1].value;
  const email = document.getElementsByTagName('input')[2].value;
  const isMatch = (str: string) => {
    if (str.match('^([А-Я]{1}[а-я]{1,23}|[A-Z]{1}[a-z]{1,23})$')) {
      return true;
    }
    return false;
  };

  // add image users
  const fileSelect = document.getElementById('fileSelect');
  const fileElem = document.getElementById('fileElem');

  fileSelect!.addEventListener('click', () => {
    if (fileElem) {
      fileElem.click();
    }
  });

  if (isMatch(frstName) && isMatch(lstName)) {
    const user = {
      firstName: `${frstName}`,
      lastName: `${lstName}`,
      Email: `${email}`,
      Image: 'none',
    };
    store.add(user);
    show('none');
    document.getElementById('myform')!.reset();
    const regBtn = document.getElementById('btnReg');
    regBtn!.style.display = 'none';
    const startBtn = document.getElementById('btnStart');
    startBtn!.style.display = 'flex';
  }
};

dbReq.onsuccess = (event) => {
  db = event.target!.result;
  addUser?.addEventListener('click', () => {
    AddUser();
  });
};

const check = () => {
  const frstName = document.getElementById('frstName');
  const lstName = document.getElementById('lstName');
  const addNewUser = document.getElementById('addUser');
  const email = document.getElementById('email');
  addNewUser!.disabled =
    frstName!.value.length < 3 ||
    lstName!.value.length < 3 ||
    email!.value.length < 3;
  frstName!.addEventListener('input', check);
  lstName!.addEventListener('input', check);
  email!.addEventListener('input', check);
};
check();
