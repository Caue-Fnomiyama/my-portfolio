document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================================
     DIREÇÃO DE ARTE & ESTILO (CSS INJETADO)
     Theme: iOS 18 / Apple Human Interface Guidelines
     ========================================================================== */
  const style = document.createElement("style");
  style.textContent = `
    :root {
      /* Curva de Animação Apple (Spring Physics) */
      --ios-ease: cubic-bezier(0.25, 1, 0.5, 1);
      --glass-blur: blur(20px);
      
      /* Cores Semânticas iOS 18 */
      --color-primary: #000000;
      --color-secondary: #86868b;
      --bg-metallic: linear-gradient(145deg, #ffffff 0%, #f2f2f7 100%);
      --bg-blue-haze: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
      --bg-mint: #eafbf3;
      --bg-pro-dark: linear-gradient(145deg, #1c1c1e 0%, #000000 100%);
      --bg-note: linear-gradient(135deg, #fff9c4 0%, #fff176 100%);
    }

    /* TIPOGRAFIA REFINADA */
    body {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      
    }
    
    h1 { letter-spacing: -0.02em; }
     span { letter-spacing: -0.01em; color: var(--color-secondary); }

    /* =========================================
       WIDGET 1: PERFIL (Refinado - Metallic)
       Correção de animação inclusa
    ========================================= */
    .widget1 {
      
   
      /* Prepara para animação */
      opacity: 0; 
      transform: translateY(30px);
    }
    
    .widget1 .title-box h1 { color: #1d1d1f; font-size: 2.2rem; }
    .widget1 .title-box p { color: #86868b; font-weight: 500; text-transform: uppercase; font-size: 1.3rem; letter-spacing: 0.1em; }
    .widget1 h2 { color: #1d1d1f; font-size: 1.3rem; line-height: 1.4; max-width: 90%; }
    
    /* Contatos Minimalistas */
    .contact-box .box { gap: 0px; }
    .linkedin, .insta, .mail, .wpp {
      
   
     
      padding: 0 !important;
      transition: all 0.3s var(--ios-ease);
    }
    
    /* =========================================
       SKILLS (Refinado - Blue Haze)
       Correção de animação inclusa
    ========================================= */
    .skills {

      opacity: 0;
    }
    
    .skills h1 { color: #000000; }
 
    .skills-box p { 
      font-size: 1.rem; 
      color: #000000; 
      display: flex; 
      justify-content: space-between;
      width: 100%;
      margin-bottom: 8px;
    }

    /* =========================================
       NOTES (Highlighter Functionality)
    ========================================= */
 
  
    .active-node .notes-box h1 { background-size: 100% 100%; transition-delay: 0.4s; }

    /* =========================================
       STATUS (Refinado - Mint)
    ========================================= */
   
    /* =========================================
       SETUP WIDGET (Pro Dark Mode)
    ========================================= */
    .setup-widget {
      background: var(--bg-pro-dark) !important;
      color: white;
    }
    .setup-widget .category { color: #86868b !important; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; }
    .setup-widget .model { color: #f5f5f7 !important; font-size: 1.1rem; font-weight: 500; }
    .setup-icon i { color: #ffffff; }

    /* =========================================
       READING (Paper)
    ========================================= */
    .reading-widget { background: #fdf8f4 !important; } /* Papel suave */
    .read-fill { background: #1d1d1f !important; }
    .status-tag { background: #1d1d1f !important; color: white !important; font-weight: 600; letter-spacing: 0.05em; }

    /* =========================================
       CORE ANIMATION ENGINE
    ========================================= */
    .reveal-base {
      opacity: 0 !important; /* Força invisibilidade inicial */
      will-change: transform, opacity, filter;
      filter: blur(10px);
      transition: 
        transform 1.0s var(--ios-ease), 
        opacity 1.0s var(--ios-ease), 
        filter 1.0s var(--ios-ease);
    }

    .active-node {
      opacity: 1 !important;
      transform: translate3d(0, 0, 0) scale(1) !important;
      filter: blur(0px) !important;
    }

    /* Hover "Lift" Effect (Apple TV style) */

    /* Tipos de Entrada */
    .type-spring { transform: translateY(60px) scale(0.95); }
    .type-slide { transform: translateX(-40px); }
    .type-zoom { transform: scale(0.9); filter: blur(15px); }
    
    /* Cascata de Texto */
    .stagger-child {
      opacity: 0;
      transform: translateY(15px);
      transition: all 0.6s var(--ios-ease);
    }
    .active-node .stagger-child {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  const config = [
    { selector: ".widget1", type: "type-spring" },
    { selector: ".skills", type: "type-slide" },
    { selector: ".notes", type: "type-spring" },
    { selector: ".status", type: "type-slide" },
    { selector: ".pet", type: "type-zoom" },
    { selector: ".londres", type: "type-spring" },
    { selector: ".widget-music", type: "type-zoom" },
    { selector: ".me", type: "type-slide" },
    { selector: ".setup-widget", type: "type-zoom" },
    { selector: ".reading-widget", type: "type-slide" },
    { selector: ".widget-music-2", type: "type-spring" },
    { selector: ".thank-you-card", type: "type-zoom" },
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;

        const children = el.querySelectorAll(
          "h1, h2, h3, h4, p, span, .line3, .track-item",
        );

        if (entry.isIntersecting) {
          el.classList.add("active-node");

          children.forEach((child, i) => {
            if (i < 8) {
              child.classList.add("stagger-child");
              child.style.transitionDelay = `${0.1 + i * 0.05}s`;
            }
          });
        } else {
          if (entry.boundingClientRect.top > 100) {
            el.classList.remove("active-node");
            children.forEach((child) =>
              child.classList.remove("stagger-child"),
            );
          }
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px",
    },
  );

  config.forEach((item) => {
    const elements = document.querySelectorAll(item.selector);
    elements.forEach((el) => {
      el.classList.add("reveal-base", item.type);

      el.style.opacity = "";
      observer.observe(el);
    });
  });
});
