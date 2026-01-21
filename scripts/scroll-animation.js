document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement('style');
  style.textContent = `
    .parent-reveal {
      opacity: 0;
      filter: blur(8px);
      transform: scale(0.7) translateY(60px);
      transition: 
        opacity 1.2s cubic-bezier(0.2, 0, 0.2, 1),
        filter 1s ease-out,
        transform 1.4s cubic-bezier(0.15, 1.85, 0.3, 1);
      will-change: transform, opacity, filter;
    }

    .child-reveal {
      opacity: 0;
      filter: blur(4px);
      transform: translateX(-50px) scale(0.9);
      transition: 
        opacity 0.8s ease-out,
        filter 0.8s ease-out,
        transform 1.1s cubic-bezier(0.22, 1.61, 0.36, 1);
      will-change: transform, opacity, filter;
    }

    .parent-reveal.active {
      opacity: 1;
      filter: blur(0);
      transform: scale(1) translateY(0);
    }

    .parent-reveal.active .child-reveal {
      opacity: 1;
      filter: blur(0);
      transform: translateX(0) scale(1);
    }
  `;
  document.head.appendChild(style);

  const parents = document.querySelectorAll('.widget1, .skills, .notes, .status, .pet, .londres, .widget-music, .me, .contact-box, .box');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const parent = entry.target;
        parent.classList.add('active');

        const children = parent.querySelectorAll('h1, h2, h4, p, span, .line3, .skills-box p, .linkedin, .mail, .insta, .wpp, .album-box, .buttons-box, .perfil, i');
        
        children.forEach((child, index) => {
          child.classList.add('child-reveal');
          child.style.transitionDelay = `${0.2 + (index * 0.07)}s`;
        });
      }
    });
  }, { threshold: 0.05, rootMargin: "0px 0px -10% 0px" });

  parents.forEach(p => {
    p.classList.add('parent-reveal');
    observer.observe(p);
  });
});