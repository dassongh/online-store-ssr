import { test } from './variables';
import json from './assets/json';
import './babel';

import xml from './assets/data.xml';

import logo from './assets/valtech-logo.png';

import './styles/styles.css';
import './styles/sass.scss';

console.log(test);
console.log(logo);
console.log('XML', xml);

const counterRef = document.querySelector('p');
const btnRef = document.querySelector('button');
let counter = 0;

btnRef.addEventListener('click', () => {
  counter++;
  counterRef.textContent = counter;
});

console.log('JSON', json);
