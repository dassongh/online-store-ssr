import { test } from './variables';
import json from './assets/json';

import './styles/styles.css';

console.log(test);

const counterRef = document.querySelector('p');
const btnRef = document.querySelector('button');
let counter = 0;

btnRef.addEventListener('click', () => {
  counter++;
  counterRef.textContent = counter;
});

console.log('JSON', json);
