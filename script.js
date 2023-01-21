const sectionPalette = document.createElement('section');
const body = document.querySelector('body');
sectionPalette.id = 'color-palette';

body.appendChild(sectionPalette);

for (let i = 0; i < 4; i += 1) {
  const cores = ['red', 'blue', 'purple', 'yellow'];
  const pegarSection = document.querySelector('section');
  let criarQuadrado = document.createElement('div');
  criarQuadrado.classList.add('quadrado', cores[i], 'color');
  pegarSection.appendChild(criarQuadrado);
  criarQuadrado = undefined;
}
