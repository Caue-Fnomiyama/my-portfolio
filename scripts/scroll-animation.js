document.addEventListener("DOMContentLoaded", () => {
  // 1. Injetar CSS de Alta Performance
  const style = document.createElement('style');
  style.textContent = `
    /* O segredo da fluidez: Curva de Bézier 'Quintic Out' modificada para sensação de peso */
    :root {
      --ease-out-fluid: cubic-bezier(0.23, 1, 0.32, 1.05); /* Entrada suave com leve repouso */
      --ease-in-retract: cubic-bezier(0.4, 0, 0.2, 1);     /* Saída rápida e limpa */
    }

    /* Base para todos os elementos animados */
    .reveal-base { 
      opacity: 0; 
      will-change: transform, opacity, filter;
      /* A transição aqui define como ele VOLTA ao estado invisível (quando sai da tela) */
      transition: transform 0.8s var(--ease-in-retract), 
                  opacity 0.8s var(--ease-in-retract), 
                  filter 0.8s var(--ease-in-retract);
    }

    /* --- TIPOS DE ANIMAÇÃO (Estados Iniciais) --- */
    
    .type-spring { 
      transform: translateY(80px) scale(0.92); 
    }
    
    .type-slide { 
      transform: translateX(-60px) skewX(-2deg); 
    }
    
    .type-float { 
      transform: translateY(60px) scale(0.95); 
    }
    
    .type-flip { 
      transform: perspective(1500px) rotateX(45deg) translateY(40px); 
      transform-origin: center top;
    }
    
    .type-zoom { 
      transform: scale(0.8); 
      filter: blur(10px); 
    }

    /* --- ESTADO ATIVO (Quando visível) --- */
    .active-node { 
      opacity: 1 !important; 
      transform: translate3d(0, 0, 0) scale(1) rotate(0) skew(0) !important; 
      filter: blur(0) !important;
      
      /* A transição aqui define a ENTRADA (mais lenta e detalhada) */
      transition: transform 1.2s var(--ease-out-fluid), 
                  opacity 1.2s ease-out, 
                  filter 1.2s ease-out !important;
    }

    /* --- FILHOS (STAGGER) --- */
    /* Seleciona tudo que é texto ou ícone para animar em cascata */
    .stagger-child {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.5s ease-out; /* Saída rápida dos filhos */
    }

    .active-node .stagger-child {
      opacity: 1;
      transform: translateY(0);
      /* O delay será injetado via JS, mas a curva é suave */
      transition: all 0.8s var(--ease-out-fluid);
    }
  `;
  document.head.appendChild(style);

  // 2. Configuração dos Alvos
  const config = [
    { selector: '.widget1', type: 'type-spring' },
    { selector: '.skills', type: 'type-slide' },
    { selector: '.notes', type: 'type-float' },
    { selector: '.status', type: 'type-flip' },
    { selector: '.pet', type: 'type-zoom' },
    { selector: '.londres', type: 'type-spring' },
    { selector: '.widget-music', type: 'type-zoom' },
    { selector: '.me', type: 'type-flip' },
    { selector: '.contact-box', type: 'type-slide' },
    { selector: '.box', type: 'type-float' }
  ];

  // 3. O Observador Inteligente (Reversível)
  const observerOptions = {
    threshold: 0.15, // Espera 15% do elemento aparecer para evitar falsos disparos
    rootMargin: "0px 0px -50px 0px" // Dispara um pouco antes de sair totalmente
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      const children = el.querySelectorAll('h1, h2, h3, h4, p, span, i, .line3, .skills-box p, .linkedin, .mail, .insta, .wpp, .perfil, .album, .vinyl, .disc');

      if (entry.isIntersecting) {
        // --- ENTROU NA TELA (PLAY) ---
        el.classList.add('active-node');
        
        // Cascata suave nos filhos
        children.forEach((child, i) => {
          // Limitamos o delay máximo para não ficar esperando muito em listas grandes
          const delay = Math.min(i * 0.05, 0.5); 
          child.style.transitionDelay = `${0.1 + delay}s`;
        });

      } else {
        // --- SAIU DA TELA (REVERSE) ---
        // Verifica se saiu por CIMA ou por BAIXO para resetar
        const bounding = entry.boundingClientRect;
        
        // Só remove a classe se o usuário realmente rolou para longe
        // Isso impede "flicker" (piscar) se o elemento estiver na borda
        el.classList.remove('active-node');
        
        // Remove delays para a saída ser instantânea/limpa
        children.forEach(child => {
          child.style.transitionDelay = '0s';
        });
      }
    });
  }, observerOptions);

  // 4. Inicialização
  config.forEach(item => {
    const elements = document.querySelectorAll(item.selector);
    elements.forEach(el => {
      // Adiciona as classes base
      el.classList.add('reveal-base', item.type);
      
      // Prepara os filhos
      const children = el.querySelectorAll('h1, h2, h3, h4, p, span, i, .line3, .skills-box p, .linkedin, .mail, .insta, .wpp, .perfil, .album, .vinyl, .disc');
      children.forEach(child => child.classList.add('stagger-child'));

      // Começa a observar
      observer.observe(el);
    });
  });
});