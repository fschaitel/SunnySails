![Sunny Banner](docs/sunny.png)

![versão](https://img.shields.io/badge/version-1.7.0-green)

# 🌞 Sunny

**Sunny** é um jogo 2D runner com inspiração retrô, feito com HTML, CSS e JavaScript.  
É um experimento pessoal — meu primeiro projeto de jogo completo — que mistura pixel art, estética de Game Boy e mecânicas básicas de jogo em uma experiência divertida de aprendizado.

> 🎮 **Jogue agora:** [Clique aqui para jogar Sunny no GitHub Pages](https://fschaitel.github.io/Sunny/)

---

## 🎯 Objetivos

- Criar um jogo web completo do zero  
- Explorar loops de jogo, animação e renderização com canvas  
- Usar pixel art no design visual  
- Implementar detecção de colisão e controle do jogador  
- Adicionar áudio e fluxo simples de interface

---

## 🛠️ Feito com

- **HTML5** – estrutura e canvas  
- **CSS3** – layout, tela inicial e estilo  
- **JavaScript (Puro)** – lógica do jogo, eventos, e loop  
- **Pixel Art** – sprites personalizados em estilo retrô  
- **Áudio MP3** – música de fundo em looping (chiptune)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Canvas API](https://img.shields.io/badge/Canvas-2D-0e76a8)
![RetroPixel](https://img.shields.io/badge/Pixel-Art-green)

---

## 🧠 Como Funciona

- O jogo começa com uma **tela de introdução em preto e branco** e um botão **START**
- Ao clicar em START:
  - Um **vídeo de introdução** é exibido  
  - A música de fundo começa a tocar em looping  
  - O jogador controla o navio "Sunny" com as teclas de seta
- **↑ / ↓** movem o navio na vertical (mas ele não pode subir até o céu!)
- **← / →** movem o navio horizontalmente pela tela
- **Ondas** aparecem como obstáculos da direita em posições e tamanhos aleatórios
- Colidir com uma onda ou bala de canhão causa dano. Perder todas as vidas = **GAME OVER**
- Alcance 10.000 pontos para enfrentar o **Chefe da Marinha**
- Derrote o chefe para ver a **Tela de Vitória**

---

## ▶️ Como Jogar

- Pressione `START`
- Assista ao vídeo de introdução
- Use as teclas `↑ ↓ ← →` para pilotar o navio
- Evite ondas, Reis do Mar e balas de canhão!
- Pegue itens de vida (máximo de 3 vidas)
- Sobreviva e atinja 10.000 pontos para lutar contra o chefe

---

## 🧪 Destaques Educacionais

Este projeto cobre conceitos fundamentais do desenvolvimento de jogos:

- Loop de jogo com `requestAnimationFrame`
- Renderização 2D com canvas
- Física e movimento básicos
- Geração aleatória de obstáculos
- Detecção de colisão com ajuste de hitbox
- Fluxo de interface (início → intro → jogo → chefe → game over / vitória)
- Integração de áudio e vídeo

---

## 🔹 Histórico de Versões

### 🔎 v1.7.0 – Chefe da Marinha, Tela de Vitória & Easter Egg (2025-04-02)
- 🚢 Chefe da Marinha aparece com **10.000 pontos**, atira balas de canhão  
- 🏴‍☠️ Tela de vitória ao derrotar o chefe  
- ❓ Imagem misteriosa aparece com efeito de tremor aos 6100 pontos  
- 💙 Diálogo entre Garp e Luffy entre 7000-8000 pontos

#### Balanceamento e Ajustes
- Frequência de obstáculos escala com a pontuação (100 → 80 → 60)  
- Item de vida aparece a cada 8000 pontos (antes era 10000)  
- Máximo de vidas reduzido para 3 (antes era 5)

### 🔎 v1.5.1 – Obstáculos Progressivos & Ajustes de Vida (2025-04-01)  
- Taxa de aparecimento de obstáculos agora escala com a pontuação  
- Frequência dos itens de vida reduzida; máximo de 3 vidas

### 🔎 v1.4.1 – Interface 8-bit Aprimorada (2025-03-30)  
- Telas de START & GAME OVER redesenhadas com fundos pixelados  
- Fonte pixel e paleta arcade nos botões

### 🔎 v1.4.0 – Vídeo de Introdução & Música (2025-03-30)  
- Vídeo de introdução sincronizado com música  
- Jogo só começa após o fim do vídeo

### 🔎 v1.3.0 – Rei do Mar, Movimento Diagonal & Velocidade (2025-03-30)  
- Rei do Mar aparece a cada 1500 pontos  
- Movimento diagonal e escala de velocidade implementados  
- Sistema de entrada e lógica de colisão refatorados

### 🔎 v1.1 – Estética Retrô & Game Over (2025-03-29)  
- Visual estilo Game Boy  
- Reinício do jogo sem recarregar a página  
- Fundo com paralaxe suave

---

## 📁 Estrutura do Projeto

```
SunnySails/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── ocean-bg-light.png
    ├── sunny-8bit.png
    ├── wave.png
    ├── gb-music.mp3
    ├── sea-king.png
    ├── navy-boss.png
    ├── cannonball.png
    ├── crew.png
    ├── luffy-banner.png
    ├── garp-banner.png
    ├── akuma-nomi.png
    ├── straw-hat.png
    ├── berry.png
    └── intro-video.mp4
```

---

## 🚀 Executar Localmente

```bash
git clone https://github.com/your-username/Sunny.git
cd Sunny
# Use o Live Server (extensão do VS Code) ou qualquer servidor HTTP local
```

> 💡 Não abra com `file://`. Use o Live Server para evitar problemas com carregamento de áudio/imagem.

---

## 🌐 Hospedar Online (GitHub Pages)

1. Envie este projeto para um repositório público no GitHub  
2. Vá até **Configurações > Pages**  
3. Defina **Fonte: main / raiz**  
4. Após publicado, seu jogo estará disponível em:  
```
https://seu-usuario.github.io/Sunny/
```

---

## 📚 Tutorial

Quer aprender como esse jogo foi feito passo a passo?  
Confira o tutorial completo aqui:  
👉 [Sunny Sails – Tutorial Completo de Desenvolvimento](.docs/tutorial.md)

---

## 📜 Licença

Este projeto é aberto para aprendizado e diversão.  
Você pode reutilizar o código livremente. Por favor, credite ou substitua os visuais/áudios se for publicá-lo em outro lugar.

---

## 🙏 Créditos

- Fonte: [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P)  
- Inspiração One Piece: personagens e estética © Eiichiro Oda  
- Todas as imagens e sons são personalizados ou adaptados para uso não comercial

---

## 👨‍💻 Autor

Criado com curiosidade e amor por pixel  
por **Felipe Schaitel**  
🗓️ 04 de abril de 2025
