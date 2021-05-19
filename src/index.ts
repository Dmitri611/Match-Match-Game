import './styles.scss';
import './assets/953818.svg';
import './assets/free-icon-cogwheel-3953263.svg';
import './assets/best.svg';
import './assets/one.svg';
import './assets/image_register.svg';
import './timer.ts';
import './components/cards-field/cards-field.ts';

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

dbReq.onupgradeneeded = (event: any) => {
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

  // add image users NOT WORK!!!!!!!!!!
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
    const form = document.getElementById('myform') as HTMLFormElement;
    form.reset();
    const regBtn = document.getElementById('btnReg');
    regBtn!.style.display = 'none';
    const startBtn = document.getElementById('btnStart');
    startBtn!.style.display = 'flex';
  }
};

dbReq.onsuccess = (event: any) => {
  const { target } = event;
  db = target.result;
  addUser?.addEventListener('click', () => {
    AddUser();
  });
};

const check = () => {
  const frstName = document.getElementById('frstName') as HTMLInputElement;
  const lstName = document.getElementById('lstName') as HTMLInputElement;
  const addNewUser = document.getElementById('addUser') as HTMLInputElement;
  const email = document.getElementById('email') as HTMLInputElement;
  addNewUser!.disabled =
    frstName!.value.length < 3 ||
    lstName!.value.length < 3 ||
    email!.value.length < 3;
  frstName!.addEventListener('input', check);
  lstName!.addEventListener('input', check);
  email!.addEventListener('input', check);
};
check();
