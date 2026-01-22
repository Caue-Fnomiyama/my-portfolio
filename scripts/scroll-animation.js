document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("style");
  style.textContent = `
    :root {
      --fluid-ease: cubic-bezier(0.16, 1, 0.3, 1);
      /* O blur exato de 14px solicitado */
      --glass-blur: blur(14px);
    }

    /* --- ANIMAÇÃO DOS WIDGETS --- */
    .reveal-base { 
      opacity: 0; 
      will-change: transform, opacity;
      filter: blur(8px); /* Blur de entrada (animação) */
      transition: 
        transform 1.2s var(--fluid-ease), 
        opacity 1.2s var(--fluid-ease), 
        filter 1.2s var(--fluid-ease);
    }

    .active-node { 
      opacity: 1 !important; 
      transform: translate3d(0, 0, 0) !important; 
      filter: blur(0px) !important;
    }

    /* Tipos de movimento */
    .type-spring { transform: translateY(50px); }
    .type-slide { transform: translateX(-40px); }
    .type-float { transform: translateY(30px); }
    .type-flip { transform: perspective(1000px) rotateX(-10deg); }
    .type-zoom { transform: scale(1.05); }

    /* =========================================
       FOCO: .LINKEDIN, .MAIL, .INSTA, .WPP
    ========================================= */
    .linkedin, .mail, .insta, .wpp {
      /* Remove qualquer filtro de animação que venha do pai para não criar "sombra" */
      filter: none !important; 
      
      /* Aplica APENAS o blur no fundo */
      backdrop-filter: var(--glass-blur) !important;
      -webkit-backdrop-filter: var(--glass-blur) !important;
      
      /* Cor de fundo semi-transparente para o blur ser visível */
      background-color: rgba(215, 251, 233, 0.4) !important;
      
      /* Remove sombras indesejadas */
      box-shadow: none !important;
      
      /* Mantém visível e estável */
      opacity: 1 !important;
      transform: none !important;
      will-change: backdrop-filter;
    }

    /* Efeito de cascata apenas para textos e outros ícones */
    .stagger-child {
      opacity: 0;
      transform: translateY(15px);
      transition: transform 0.8s var(--fluid-ease), opacity 0.8s var(--fluid-ease);
    }

    .active-node .stagger-child {
      opacity: 1;
      transform: translateY(0);
    }

    /* =========================================
       MARCA-TEXTO ANIMADO (NOTES)
    ========================================= */
    .notes-box { position: relative; overflow: hidden; }
    
    .notes-box .line2, .notes-box .ball2 {
      opacity: 0;
      transform: translateX(-100px); 
      transition: transform 1.2s var(--fluid-ease), opacity 0.8s ease;
    }

    .active-node .notes-box .line2, .active-node .notes-box .ball2 {
      opacity: 1;
      transform: translateX(0);
      transition-delay: 0.3s;
    }

    .notes-box h1 {
      position: relative;
      background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
      background-repeat: no-repeat;
      background-size: 0% 40%; 
      background-position: 0% 85%;
      transition: background-size 1.2s var(--fluid-ease);
      padding: 0 4px;
    }

    .active-node .notes-box h1 {
      background-size: 100% 40%;
      transition-delay: 0.3s;
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
        
        // Seleciona os filhos para o efeito de entrada, mas ignora os botões de contato
        const children = el.querySelectorAll("h2, h3, h4, p, span, i:not(.fa-brands, .fa-solid), .line3, .skills-box p, .perfil");

        if (entry.isIntersecting) {
          el.classList.add("active-node");
          children.forEach((child, i) => {
            child.classList.add("stagger-child");
            child.style.transitionDelay = `${0.1 + i * 0.05}s`;
          });
        } else {
          // Mantém o estado se estiver apenas scrollando de leve (evita o pisca)
          if (entry.boundingClientRect.top > 150) {
            el.classList.remove("active-node");
          }
        }
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
  );

  config.forEach((item) => {
    document.querySelectorAll(item.selector).forEach((el) => {
      el.classList.add("reveal-base", item.type);
      observer.observe(el);
    });
  });
});