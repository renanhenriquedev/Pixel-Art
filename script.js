const chart = document.createElement('section');
const body = document.querySelector('body');
chart.id = 'color-chart';

body.appendChild(chart);
const pegar = document.querySelector('#color-chart')

const cores = ['#c842e7', '#000a17 ', '#0062dd', '#e7a23c'];
for (let i = 0; i < 4; i += 1) {
  const pegarSection = document.querySelector('section');
  let criarQuadrado = document.createElement('div');
  criarQuadrado.classList.add('quadrado');
  criarQuadrado.style.backgroundColor = cores[i];
  pegarSection.appendChild(criarQuadrado);
  criarQuadrado = undefined;
}
if (localStorage.length === 0) {
  localStorage.setItem('inital-colors', JSON.stringify(cores));
}

const container = document.createElement('section');
container.id = 'container'
body.appendChild(container);
const sectionButton = document.querySelector('#container')
function createButton(type, id, texto, classe) {
  const button = document.createElement('button');
  button.type = type;
  button.id = id;
  button.innerText = texto;
  button.classList.add(classe, 'space');
  sectionButton.appendChild(button);
}

function corAleatoria() {
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const hex = `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`;
    array.push(hex);
    const filhosSection = pegar.childNodes;
    filhosSection[i].style.backgroundColor = hex;
  }
  localStorage.setItem('inital-colors', JSON.stringify(array));
}

function trocarCor() {
  const catchButton = document.getElementById('random-color');
  catchButton.addEventListener('click', corAleatoria);
}

function manterCor() {
  if (localStorage.length > 0) {
    const arrayCores = JSON.parse(localStorage.getItem('inital-colors'));
    const filhosSection = chart.childNodes;
    for (let i = 0; i < 4; i += 1) {
      filhosSection[i].style.backgroundColor = arrayCores[i];
    }
  }
}

let controle = 0;
function pixelFrame(frame) {
  if (localStorage.getItem('picture') === null) {
    for (let i = 0; i < 5; i += 1) {
      let criarQuadrado = document.createElement('div');
      criarQuadrado.classList.add('quadro','white');
      criarQuadrado.id = controle;
      controle += 1;
      frame.appendChild(criarQuadrado);
      criarQuadrado = undefined;
    }
  }
  if (localStorage.getItem('picture') !== null) {
    const tamanhoSection = localStorage.getItem('picture');
    for (let i = 0; i < tamanhoSection; i += 1) {
      let criarQuadrado = document.createElement('div');
      criarQuadrado.classList.add('quadro', 'pixel', 'white');
      criarQuadrado.id = controle;
      controle += 1;
      frame.appendChild(criarQuadrado);
      criarQuadrado = undefined;
    }
  }
}
function createSection() {
  if (localStorage.getItem('picture') === null) {
    for (let i = 0; i < 5; i += 1) {
      const frame = document.createElement('section');
      frame.id = 'paint';
      body.appendChild(frame);
      pixelFrame(frame);
    }
  }
  if (localStorage.getItem('picture') !== null) {
    const tamanhoSection = localStorage.getItem('picture');
    for (let i = 0; i < tamanhoSection; i += 1) {
      const frame = document.createElement('section');
      frame.id = 'paint';
      body.appendChild(frame);
      pixelFrame(frame);
    }
  }
}

function putClassChoosen() {
  const filhosSection = chart.childNodes;
  filhosSection[0].classList.add('choosen');
}

const filhosSection = chart.childNodes;
function catchColor() {
  for (let i = 0; i < 4; i += 1) {
    filhosSection[i].addEventListener('click', () => {
      if ('click' && filhosSection[i].classList === 'quadrado choosen') {
        const cor = filhosSection[i].style.backgroundColor;
        localStorage.setItem('corzinha', cor);
      } else if ('click' && filhosSection[i].classList !== 'quadrado choosen') {
        for (let o = 0; o < 4; o += 1) {
          filhosSection[o].classList.remove('choosen');
        }
        const cor = filhosSection[i].style.backgroundColor;
        filhosSection[i].classList.add('choosen');
        localStorage.setItem('corzinha', cor);
      }
    });
  }
}

localStorage.setItem('corzinha', 'rgb(200, 66, 231)');

function clean() {
  const painel = document.querySelectorAll('#paint');
  for (let i = 0; i < painel.length; i += 1) {
    const divs = painel[i].childNodes;
    for (let o = 0; o < painel.length; o += 1) {
        divs[o].style.backgroundColor = 'white';
    }
  }
  localStorage.removeItem('draw');
  localStorage.removeItem('backgroundcolor');
}

function executClean() {
  const buttonClean = document.querySelector('#clear');
  buttonClean.addEventListener('click', () => {
    clean()
  })
}

function draw() {
  if (localStorage.getItem('draw') !== null) {
    const desenho = JSON.parse(localStorage.getItem('draw'));
    const tamanho = desenho.length;
    const corDesenho = JSON.parse(localStorage.getItem('backgroundcolor'));
    for (let i = 0; i < tamanho; i += 1) {
      const refresh = document.getElementById(desenho[i]);
      refresh.style.backgroundColor = corDesenho[i];
    }
  }
}

function paint() {
  const painel = document.querySelectorAll('#paint');
  const array = [];
  const arraySegundo = [];
  for (let i = 0; i < painel.length; i += 1) {
    const filhosPainel = painel[i].childNodes;
    for (let o = 0; o < filhosPainel.length; o += 1) {
      filhosPainel[o].addEventListener('click', () => {
        filhosPainel[o].style.backgroundColor = localStorage.getItem('corzinha');
        const corPosition = filhosPainel[o].style.backgroundColor;
        const { id } = filhosPainel[o];
        array.push(id);
        arraySegundo.push(corPosition);
        localStorage.setItem('draw', JSON.stringify(array));
        localStorage.setItem('backgroundcolor', JSON.stringify(arraySegundo));
      });
    }
  }
}

function createInput() {
  const input = document.createElement('input');
  input.id = 'change-size';
  input.type = 'number';
  input.min = '1';
  input.class = 'space';
  sectionButton.appendChild(input);
}

function problemVQV() {
  const input = document.querySelector('#change-size');
  const valor = input.value;
  if (valor === '') {
    alert('Nenhum valor digitado!');
  }
}

function apagarBoard() {
  const teste = document.querySelectorAll('#paint');
  for (let i = 0; i < teste.length; i += 1) {
    body.removeChild(teste[i]);
  }
}

function alterarBoard() {
  const input = document.querySelector('#change-size');
  const valor = input.value;
  let controle = 0
  if (valor > 5 && valor <= 60) {
    function pixelFrame(frame) {
      for (let i = 0; i < valor; i += 1) {
        let criarQuadrado = document.createElement('div');
        criarQuadrado.classList.add('quadro', 'pixel', 'white');
        criarQuadrado.id = controle;
        controle += 1;
        frame.appendChild(criarQuadrado);
        criarQuadrado = undefined;
      }
    }

    for (let i = 0; i < valor; i += 1) {
      const frame = document.createElement('section');
      frame.id = 'paint';
      body.appendChild(frame);
      pixelFrame(frame);
    }
  }
}

function minBoard() {
  const input = document.querySelector('#change-size');
  const valor = input.value;
  if (valor <= 5) {
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

    for (let i = 0; i < 5; i += 1) {
      const frame = document.createElement('section');
      frame.id = 'paint';
      body.appendChild(frame);
      pixelFrame(frame);
    }
  }
}

function maxBoard() {
  const input = document.querySelector('#change-size');
  const valor = input.value;
  if (valor > 60) {
    function pixelFrame(frame) {
      for (let i = 0; i < 60; i += 1) {
        let criarQuadrado = document.createElement('div');
        criarQuadrado.classList.add('quadro', 'pixel', 'white');
        criarQuadrado.id = controle;
        controle += 1;
        frame.appendChild(criarQuadrado);
        criarQuadrado = undefined;
      }
    }

    for (let i = 0; i < 60; i += 1) {
      const frame = document.createElement('section');
      frame.id = 'paint';
      body.appendChild(frame);
      pixelFrame(frame);
    }
  }
  localStorage.setItem('picture', JSON.stringify(document.querySelectorAll('#paint').length));
}
function buttonVQV() {
  const button = document.querySelector('#button-size');
  button.addEventListener('click', () => {
    problemVQV();
    apagarBoard();
    alterarBoard();
    minBoard();
    maxBoard();
    paint();
  });
}

function init() {
  createButton('button', 'random-color', 'Gerar Cores');
  createButton('button', 'clear', 'Limpar', 'button');
  trocarCor();
  manterCor();
  createSection();
  putClassChoosen();
  catchColor();
  paint();
  executClean();
  draw();
  createInput();
  createButton('button', 'button-size', 'Tamanho')
  buttonVQV();
}

window.onload = init;