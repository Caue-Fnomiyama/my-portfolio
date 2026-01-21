document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement('style');
  style.textContent = `
    .reveal-base { opacity: 0; will-change: transform, opacity, filter; }
    
    .type-spring { transform: scale(0.5) translateY(100px); transition: all 1.2s cubic-bezier(0.34, 2, 0.6, 1); }
    .type-slide { transform: translateX(-100px) rotate(-5deg); transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    .type-float { transform: translateY(50px) scale(0.95); transition: all 1.5s cubic-bezier(0.23, 1, 0.32, 1); }
    .type-flip { transform: perspective(1000px) rotateX(-30deg) translateY(80px); transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1); }
    .type-zoom { transform: scale(1.3); filter: blur(15px); transition: all 1.1s cubic-bezier(0.34, 1.56, 0.64, 1); }

    .active-node { opacity: 1 !important; transform: translate(0) scale(1) rotate(0) rotateX(0) !important; filter: blur(0) !important; }

    .stagger-child { 
      opacity: 0; 
      transform: translateY(20px) scale(0.8); 
      transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1); 
    }
    .active-node .stagger-child { opacity: 1; transform: translateY(0) scale(1); }
  `;
  document.head.appendChild(style);

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

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active-node');
        const children = entry.target.querySelectorAll('h1, h2, h4, p, span, i, .line3, .skills-box p, .linkedin, .mail, .insta, .wpp, .perfil');
        children.forEach((child, i) => {
          child.classList.add('stagger-child');
          child.style.transitionDelay = `${0.2 + (i * 0.08)}s`;
        });
      }
    });
  }, { threshold: 0.1 });

  config.forEach(item => {
    const elements = document.querySelectorAll(item.selector);
    elements.forEach(el => {
      el.classList.add('reveal-base', item.type);
      observer.observe(el);
    });
  });
});