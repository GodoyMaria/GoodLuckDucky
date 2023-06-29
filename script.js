const sprites = new Image();
sprites.src = 'Sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

let frames = 0;

// [Objetos do Jogo]

function CriaDucky() {
    const Ducky = {
        SpriteX: 0,
        SpriteY: 0,
        largura: 68,
        altura: 60,
        x: 10,
        y: 50,
        velocidade: 0,
        gravidade: 0.3,
        pulo: 5,
    
        movimentos: [
            {SpriteX: 0, SpriteY: 0, },
            {SpriteX: 0, SpriteY: 64, },
        ],

        FrameAtual: 0,

        AtualizaFrame() {
            const IntervaloFrame = 10;
            const PassouIntervalo = frames % IntervaloFrame === 0;

            if(PassouIntervalo) {
                const BaseIncremento = 1;
                const Incremento = BaseIncremento + Ducky.FrameAtual;
                const BaseRepeticao = Ducky.movimentos.length;

                Ducky.FrameAtual = Incremento % BaseRepeticao
            };
        },

        desenha() {
            Ducky.AtualizaFrame();

            const {SpriteX, SpriteY} = Ducky.movimentos[Ducky.FrameAtual];

            contexto.drawImage(
                sprites,
                SpriteX, SpriteY, //SpriteX e SpriteY
                Ducky.largura, Ducky.altura, // Tamanho do recorte na sprite
                Ducky.x, Ducky.y, //Posição
                Ducky.largura, Ducky.altura, //Tamanho imagem no site
            );
        },
    
        atualiza() {
            if(Colisao(Ducky, Chao)) {
                MudaTela(Telas.GameOver);
                return;
            };
    
            Ducky.velocidade = Ducky.velocidade + Ducky.gravidade;
            Ducky.y = Ducky.y + Ducky.velocidade;
        },
    
        pula() {
            Ducky.velocidade = - Ducky.pulo;
        },
    }
    return Ducky;
};

const Chao = {
    largura: 383,
    altura: 100,
    x: 0,
    y: canvas.height,

    desenha() {
        contexto.drawImage(
            sprites,
            Chao.SpriteX, Chao.SpriteY, //SpriteX e SpriteY
            Chao.largura, Chao.altura, // Tamanho do recorte na sprite
            Chao.x, Chao.y, //Posição
            Chao.largura, Chao.altura, //Tamanho imagem no site
        );

        contexto.drawImage(
            sprites,
            Chao.SpriteX, Chao.SpriteY, //SpriteX e SpriteY
            Chao.largura, Chao.altura, // Tamanho do recorte na sprite
            (Chao.x + Chao.largura), Chao.y, //Posição
            Chao.largura, Chao.altura, //Tamanho imagem no site
        );
    }
}

function CriaBackground() {
    const Background = {
        SpriteX: 157,
        SpriteY: 0,
        largura: 390,
        altura: 144,
        x: 0,
        y: (canvas.height - 144),
    
        desenha() {
            contexto.fillStyle = '#7a95a7'
            contexto.fillRect(0,0, canvas.width, canvas.height)
    
            contexto.drawImage(
                sprites,
                Background.SpriteX, Background.SpriteY, //SpriteX e SpriteY
                Background.largura, Background.altura, // Tamanho do recorte na sprite
                Background.x, Background.y, //Posição
                Background.largura, Background.altura, //Tamanho imagem no site
            );
            
            contexto.drawImage(
                sprites,
                Background.SpriteX, Background.SpriteY, //SpriteX e SpriteY
                Background.largura, Background.altura, // Tamanho do recorte na sprite
                (Background.x + Background.largura), Background.y, //Posição
                Background.largura, Background.altura, //Tamanho imagem no site
            );
        },
    
        atualiza() {
            const Movimento = 1;
            const Repete = Background.largura / 2;
            const Movimentacao = Background.x - Movimento;

            Background.x = Movimentacao % Repete;
        },
    }
    return Background;
};

const MensagemInicio = {
    SpriteX: 0,
    SpriteY: 204,
    largura: 116,
    altura: 169,
    x: (canvas.width / 2) - 116 / 2,
    y: 50,

    desenha() {
        contexto.drawImage(
            sprites,
            MensagemInicio.SpriteX, MensagemInicio.SpriteY, //SpriteX e SpriteY
            MensagemInicio.largura, MensagemInicio.altura, // Tamanho do recorte na sprite
            MensagemInicio.x, MensagemInicio.y, //Posição
            MensagemInicio.largura, MensagemInicio.altura, //Tamanho imagem no site
        );
    },
}

const MensagemFim = {
    SpriteX: 142,
    SpriteY: 205,
    largura: 110,
    altura: 168,
    x: (canvas.width / 2) - 110 / 2,
    y: 50,

    desenha() {
        contexto.drawImage(
            sprites,
            MensagemFim.SpriteX, MensagemFim.SpriteY, //SpriteX e SpriteY
            MensagemFim.largura, MensagemFim.altura, // Tamanho do recorte na sprite
            MensagemFim.x, MensagemFim.y, //Posição
            MensagemFim.largura, MensagemFim.altura, //Tamanho imagem no site
        );
    },
}

function CriaNuvem() {
    const Nuvem = {
        Cloud: {
            largura: 86,
            altura: 36,
            SpriteX: 0,
            SpriteY: 417,
        },
        Trovao: {
            largura: 132,
            altura: 54,
            SpriteX: 0,
            SpriteY: 460,
        },

        desenha() {
            Nuvem.pares.forEach(function(par) {
                const RandomY = par.y;
                const EspacoNuvem = 250;

                const NuvemTrovaoX = par.x;
                const NuvemTrovaoY = Nuvem.Trovao.altura - EspacoNuvem - RandomY;
    
                contexto.drawImage (
                    sprites,
                    Nuvem.Trovao.SpriteX, Nuvem.Trovao.SpriteY,
                    Nuvem.Trovao.largura, Nuvem.Trovao.altura,
                    NuvemTrovaoX, NuvemTrovaoY,
                    Nuvem.Trovao.largura, Nuvem.Trovao.altura,
                )

                const NuvemMiniX = par.x;
                const NuvemMiniY = -RandomY;

                contexto.drawImage (
                    sprites,
                    Nuvem.Cloud.SpriteX, Nuvem.Cloud.SpriteY,
                    Nuvem.Cloud.largura, Nuvem.Cloud.altura,
                    NuvemMiniX, NuvemMiniY,
                    Nuvem.Cloud.largura, Nuvem.Cloud.altura,
                )

                par.NuvemCloud = {
                    x: NuvemMiniX,
                    y: NuvemMiniY
                  }
                par.NuvemTrovao = {
                    x: NuvemTrovaoX,
                    y: Nuvem.Trovao.altura + NuvemTrovaoY
                }
            })
        },

        TemColisao(par) {
            const CabecaDucky = globais.Ducky.y;
            const PeDucky = globais.Ducky.y + globais.Ducky.altura;

            if((globais.Ducky.x + globais.Ducky.largura) >= par.x) {
                if(CabecaDucky <= par.NuvemTrovao.y) {
                    return true;
                };
                 
                if(PeDucky >= par.NuvemCloud.y) {
                    return true;
                }
            }

            return false;
        },

        
        pares: [],

        atualiza() {
            const PassouFrames = frames % 100 === 0;

            if(PassouFrames) {
                Nuvem.pares.push({
                    x: canvas.width,
                    y: -200 * (Math.random() + 1),        
                });
            }

            Nuvem.pares.forEach(function(par) {
                par.x = par.x - 3;

                if(Nuvem.TemColisao(par)) {
                    MudaTela(Telas.GameOver);
                }

                if(par.x + Nuvem.Trovao.largura <= 0) {
                    Nuvem.pares.shift();
                }
            });
        },
    }
    return Nuvem;
};

function CriaPlacar() {
    const Placar = {
        Pontuacao: 0,

        desenha() {
            contexto.font = '30px "VT323"';
            contexto.textAlign = 'right'
            contexto.fillStyle = 'white';
            contexto.fillText(`Score ${Placar.Pontuacao}`, canvas.width - 10, 30);
        },

        atualiza() {
            const IntervaloFrame = 20;
            const PassouIntervalo = frames % IntervaloFrame === 0;

            if(PassouIntervalo) {
                Placar.Pontuacao = Placar.Pontuacao + 1;
            };
        }
    }
    return Placar;
};

// [Ação]

function Colisao(Ducky, Chao) {
    const DuckyY = Ducky.y + Ducky.altura;
    const ChaoY = Chao.y;

    if(DuckyY >= ChaoY) {
        return true;
    };
    return false;
};

// [Troca de Telas]

const globais = {};
let TelaAtiva = {};
function MudaTela(NovaTela) {
    TelaAtiva = NovaTela;

    if(TelaAtiva.inicializa) {
        TelaAtiva.inicializa();
    }
}

const Telas = {
    Inicio: {
        inicializa() {
            globais.Ducky = CriaDucky();
            globais.Background = CriaBackground();
            globais.Nuvem = CriaNuvem();
        }, 

        desenha() {
            globais.Background.desenha();
            Chao.desenha();
            globais.Ducky.desenha();
            globais.Nuvem.desenha();
            MensagemInicio.desenha();
        },

        keydown() {
            MudaTela(Telas.Jogo);
        },

        atualiza() {
            globais.Background.atualiza();
        },
    },

    Jogo: {
        inicializa() {
            globais.Placar = CriaPlacar();
        }, 

        desenha() {
            globais.Background.desenha();
            Chao.desenha();
            globais.Ducky.desenha();
            globais.Nuvem.desenha();
            globais.Placar.desenha();
        },

        keydown() {
            globais.Ducky.pula();
        },

        atualiza() {
            globais.Ducky.atualiza();
            globais.Background.atualiza();
            globais.Nuvem.atualiza();
            globais.Placar.atualiza();
        },
    },

    GameOver: {
        desenha() {
            MensagemFim.desenha();
        },

        atualiza() {

        },

        keydown() {
            MudaTela(Telas.Inicio);
        },
    },
};

// [Loop]

function loop () {
    TelaAtiva.desenha();
    TelaAtiva.atualiza();

    frames = frames + 1;

    requestAnimationFrame(loop);
};

window.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        TelaAtiva.keydown();
    }
});

MudaTela(Telas.Inicio);
loop();