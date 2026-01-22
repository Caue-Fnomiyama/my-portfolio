document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("style");
  style.textContent = `
    :root {
      /* Curva Rápida: Explosiva no início, suave no fim (0.8s total) */
      --fast-ease: cubic-bezier(0.25, 1, 0.3, 1);
      --glass-blur-initial: blur(10px);
    }

    /* --- BASE DA ANIMAÇÃO --- */
    .reveal-base { 
      opacity: 0; 
      will-change: transform, opacity;
      filter: var(--glass-blur-initial) grayscale(80%);
      transition: 
        transform 0.8s var(--fast-ease), 
        opacity 0.8s var(--fast-ease), 
        filter 0.8s var(--fast-ease);
    }

    /* ESTADO ATIVO */
    .active-node { 
      opacity: 1 !important; 
      transform: translate3d(0, 0, 0) scale(1) !important; 
      filter: none !important;
    }

    /* --- TIPOS DE MOVIMENTO (Rápidos) --- */
    .type-spring { transform: translateY(60px) scale(0.95); }
    .type-slide { transform: translateX(-60px); }
    .type-float { transform: translateY(50px); }
    .type-flip { transform: perspective(1000px) rotateX(-20deg); }
    .type-zoom { transform: scale(1.15); filter: blur(20px); }

    /* --- EFEITO CASCATA (Itens Internos) --- */
    .stagger-child {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.5s var(--fast-ease);
    }

    .active-node .stagger-child {
      opacity: 1;
      transform: translateY(0);
    }

    /* =========================================
       CORREÇÃO DO BLUR (Contatos)
       Isolamos o backdrop-filter da animação de opacidade
    ========================================= */
    .contact-box .linkedin, 
    .contact-box .insta, 
    .contact-box .mail, 
    .contact-box .wpp {
      /* Cria uma nova camada de renderização na GPU */
      transform: translateZ(0); 
      /* Força o blur */
      backdrop-filter: blur(8px) !important;
      -webkit-backdrop-filter: blur(8px) !important;
      background-color: rgba(215, 251, 233, 0.25) !important;
      transition: background-color 0.3s ease, transform 0.2s ease;
    }
    
    /* Hover leve para interatividade */
    .contact-box .linkedin:hover, .contact-box .insta:hover, .contact-box .mail:hover, .contact-box .wpp:hover {
       background-color: rgba(215, 251, 233, 0.5) !important;
       transform: translateZ(0) scale(1.05);
    }

    /* =========================================
       ANIMAÇÃO DO MARCA-TEXTO (NOTES)
    ========================================= */
    
    .notes-box {
      position: relative;
      overflow: hidden; /* Importante para o efeito de "entrar em cena" */
    }

    /* 1. Animação dos Colchetes (Line2 e Ball2) */
    /* Eles começam escondidos na ESQUERDA (junto com a Line1) */
    .notes-box .line2,
    .notes-box .ball2 {
      opacity: 0;
      /* Move para a esquerda, sobrepondo o início */
      transform: translateX(-100px); 
      transition: transform 1s var(--fast-ease), opacity 0.5s ease;
    }

    /* Quando ativo, deslizam para a DIREITA (posição original) */
    .active-node .notes-box .line2,
    .active-node .notes-box .ball2 {
      opacity: 1;
      transform: translateX(0);
      transition-delay: 0.1s; /* Pequeno delay para sincronizar com o texto */
    }

    /* 2. Animação do Texto Grifado */
    .notes-box h1 {
      position: relative;
      /* Gradiente verde marca-texto */
      background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
      background-repeat: no-repeat;
      /* Começa invisível (largura 0) */
      background-size: 0% 50%; 
      background-position: 0% 85%; /* Posição inferior */
      transition: background-size 1s var(--fast-ease);
      padding: 0 4px;
      z-index: 2;
    }

    /* Expande para a direita acompanhando os colchetes */
    .active-node .notes-box h1 {
      background-size: 100% 50%;
      transition-delay: 0.1s;
    }
  `;
  document.head.appendChild(style);

  const config = [
    { selector: ".widget1", type: "type-spring" },
    { selector: ".skills", type: "type-slide" },
    { selector: ".notes", type: "type-float" }, 
    { selector: ".status", type: "type-flip" },
    { selector: ".pet", type: "type-zoom" },
    { selector: ".londres", type: "type-spring" },
    { selector: ".widget-music", type: "type-zoom" },
    { selector: ".me", type: "type-flip" },
    { selector: ".contact-box", type: "type-slide" },
    { selector: ".box", type: "type-float" },
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        
        // CORREÇÃO DO ERRO AQUI:
        // Removi o ">" antes de "p" e "i". Agora o seletor é válido.
        // Também removi os contatos (.linkedin etc) daqui para não quebrar o blur.
        const children = el.querySelectorAll(
          "h1:not(.notes-box h1), h2, h3, h4, p, span, i, .line3, .skills-box p, .perfil"
        );

        if (entry.isIntersecting) {
          el.classList.add("active-node");
          children.forEach((child, i) => {
            child.classList.add("stagger-child");
            // Delay curto e rápido (0.05s)
            child.style.transitionDelay = `${0.05 + i * 0.05}s`;
          });
        } else {
          el.classList.remove("active-node");
          children.forEach((child) => {
            child.style.transitionDelay = "0s";
          });
        }
      });
    },
    {
      threshold: 0.15, 
      rootMargin: "0px 0px -10% 0px",
    }
  );

  config.forEach((item) => {
    document.querySelectorAll(item.selector).forEach((el) => {
      el.classList.add("reveal-base", item.type);
      observer.observe(el);
    });
  });
});
