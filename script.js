const sectionPalette = document.createElement('section');
const body = document.querySelector('body');
sectionPalette.id = 'color-palette';

body.appendChild(sectionPalette);

for (let i = 0; i < 4; i += 1) {
  const cores = ['black', 'blue', 'purple', 'yellow'];
  const pegarSection = document.querySelector('section');
  let criarQuadrado = document.createElement('div');
  criarQuadrado.classList.add('quadrado', cores[i], 'color');
  pegarSection.appendChild(criarQuadrado);
  criarQuadrado = undefined;
}

const button = document.createElement('button');
button.type = 'button';
button.id = 'button-random-color';
button.innerText = 'Cores aleatórias';
body.appendChild(button);

function corAleatoria() {
  for (let i = 1; i < 4; i += 1) {
    const hex = `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`;
    const filhosSection = sectionPalette.childNodes;
    const cores = ['black', 'blue', 'purple', 'yellow'];
    filhosSection[i].classList.remove(cores[i]);
    filhosSection[i].style.backgroundColor = hex;
  }
}
function trocarCor() {
  const catchButton = document.getElementById('button-random-color');
  catchButton.addEventListener('click', corAleatoria);
}
trocarCor();
