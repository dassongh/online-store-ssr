import { test } from './variables';

console.log(test);

const counterRef = document.querySelector('p');
const btnRef = document.querySelector('button');
let counter = 0;

btnRef.addEventListener('click', () => {
  counter++;
  counterRef.textContent = counter;
});
