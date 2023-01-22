const sectionPalette = document.createElement('section');
const body = document.querySelector('body');
sectionPalette.id = 'color-palette';

body.appendChild(sectionPalette);

function square() {
  const cores = ['#000000', '#0000ff ', '#a000c8', '#ffff00'];
  for (let i = 0; i < 4; i += 1) {
    const pegarSection = document.querySelector('section');
    let criarQuadrado = document.createElement('div');
    criarQuadrado.classList.add('quadrado', 'color');
    criarQuadrado.style.backgroundColor = cores[i];
    pegarSection.appendChild(criarQuadrado);
    criarQuadrado = undefined;
  }
  if (localStorage.length === 0) {
    localStorage.setItem('colorPalette', JSON.stringify(cores.slice(1, cores.length)));
  }
}

function createButton() {
  const button = document.createElement('button');
  button.type = 'button';
  button.id = 'button-random-color';
  button.innerText = 'Cores aleatórias';
  body.appendChild(button);
}

function corAleatoria() {
  const array = [];
  for (let i = 1; i < 4; i += 1) {
    const hex = `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`;
    array.push(hex);
    const filhosSection = sectionPalette.childNodes;
    const cores = ['black', 'blue', 'purple', 'yellow'];
    filhosSection[i].classList.remove(cores[i]);
    filhosSection[i].style.backgroundColor = hex;
  }
  localStorage.setItem('colorPalette', JSON.stringify(array));
}

function trocarCor() {
  const catchButton = document.getElementById('button-random-color');
  catchButton.addEventListener('click', corAleatoria);
}

function manterCor() {
  if (localStorage.length > 0) {
    const arrayCores = JSON.parse(localStorage.getItem('colorPalette'));
    const filhosSection = sectionPalette.childNodes;
    for (let i = 1; i < 4; i += 1) {
      filhosSection[i].style.backgroundColor = arrayCores[i - 1];
    }
  }
}

function pixelFrame(frame) {
  for (let i = 0; i < 5; i += 1) {
    let criarQuadrado = document.createElement('div');
    criarQuadrado.classList.add('quadrado', 'pixel', 'white');
    frame.appendChild(criarQuadrado);
    criarQuadrado = undefined;
  }
}

function createSection() {
  for (let i = 0; i < 5; i += 1) {
    const frame = document.createElement('section');
    frame.id = 'pixel-board';
    body.appendChild(frame);
    pixelFrame(frame);
  }
}

function init() {
  square();
  createButton();
  trocarCor();
  manterCor();
  createSection();
}

window.onload = init;
