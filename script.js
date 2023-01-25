const sectionPalette = document.createElement('section');
const body = document.querySelector('body');
sectionPalette.id = 'color-palette';

body.appendChild(sectionPalette);

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

function createButton(type, id, texto, classe) {
  const button = document.createElement('button');
  button.type = type;
  button.id = id;
  button.innerText = texto;
  button.classList.add(classe);
  body.appendChild(button);
}

function corAleatoria() {
  const array = [];
  for (let i = 1; i < 4; i += 1) {
    const hex = `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`;
    array.push(hex);
    const filhosSection = sectionPalette.childNodes;
    const coresPadroes = ['black', 'blue', 'purple', 'yellow'];
    filhosSection[i].classList.remove(coresPadroes[i]);
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

let controle = 0;
function pixelFrame(frame) {
  for (let i = 0; i < 5; i += 1) {
    let criarQuadrado = document.createElement('div');
    criarQuadrado.classList.add('quadro', 'pixel', 'white');
    criarQuadrado.id = controle;
    controle += 1;
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

function putClassSelected() {
  const filhosSection = sectionPalette.childNodes;
  filhosSection[0].classList.add('selected');
}

const filhosSection = sectionPalette.childNodes;
function catchColor() {
  for (let i = 0; i < 4; i += 1) {
    filhosSection[i].addEventListener('click', () => {
      if ('click' && filhosSection[i].classList === 'quadrado color selected') {
        const cor = filhosSection[i].style.backgroundColor;
        localStorage.setItem('corzinha', cor);
      } else if ('click' && filhosSection[i].classList !== 'quadrado color selected') {
        for (let o = 0; o < 4; o += 1) {
          filhosSection[o].classList.remove('selected');
        }
        const cor = filhosSection[i].style.backgroundColor;
        filhosSection[i].classList.add('selected');
        localStorage.setItem('corzinha', cor);
      }
    });
  }
}

localStorage.setItem('corzinha', 'rgb(0, 0, 0)');

function clean() {
  createButton('button', 'clear-board', 'Limpar', 'button');
  const button = document.querySelector('.button');
  const painel = document.querySelectorAll('#pixel-board');
  for (let i = 0; i < 5; i += 1) {
    const divs = painel[i].childNodes;
    for (let o = 0; o < 5; o += 1) {
      button.addEventListener('click', () => {
        if ('click') {
          divs[o].style.backgroundColor = 'white';
        }
      });
    }
  }
}

function draw() {
  if (localStorage.getItem('pixelBoard') !== null) {
    const teste = JSON.parse(localStorage.getItem('pixelBoard'));
    const tamanho = teste.length;
    const teste2 = JSON.parse(localStorage.getItem('backgroundcolor'));
    for (let i = 0; i < tamanho; i += 1) {
      console.log(teste2);
      console.log(teste);
      const a = document.getElementById(teste[i]);
      console.log(teste[i]);
      a.style.backgroundColor = teste2[i];
    }
  }
}

function paint() {
  const painel = document.querySelectorAll('#pixel-board');
  const array = [];
  const arraySegundo = [];
  for (let i = 0; i < 5; i += 1) {
    const filhosPainel = painel[i].childNodes;
    for (let o = 0; o < 5; o += 1) {
      filhosPainel[o].addEventListener('click', () => {
        if ('click') {
          filhosPainel[o].style.backgroundColor = localStorage.getItem('corzinha');
          const corPosition = filhosPainel[o].style.backgroundColor;
          const { id } = filhosPainel[o];
          array.push(id);
          arraySegundo.push(corPosition);
          localStorage.setItem('pixelBoard', JSON.stringify(array));
          localStorage.setItem('backgroundcolor', JSON.stringify(arraySegundo));
        }
      });
    }
  }
}
function init() {
  createButton('button', 'button-random-color', 'Cores aleatórias');
  trocarCor();
  manterCor();
  createSection();
  putClassSelected();
  catchColor();
  paint();
  clean();
  // catchPosition();
  draw();
}

window.onload = init;
