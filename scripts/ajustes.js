document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement('style');
  style.textContent = `
    :root { color-scheme: light; }
    
    .parent-reveal {
      opacity: 0;
      transform: scale(0.9) translateY(40px);
      transition: opacity 0.8s ease, transform 1s cubic-bezier(0.34, 1.56, 0.64, 1);
      will-change: transform, opacity;
      -webkit-backface-visibility: hidden;
    }

    .child-reveal {
      opacity: 0;
      transform: translateX(-30px);
      transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
      will-change: transform, opacity;
    }

    .active-node { opacity: 1; transform: scale(1) translateY(0); }
    .active-node .child-reveal { opacity: 1; transform: translateX(0); }

    .linkedin, .insta, .mail, .wpp {
      margin-right: -15px;
      backdrop-filter: blur(8px) !important;
      -webkit-backdrop-filter: blur(8px) !important;
    }

    @media (max-width: 768px) {
      .app { width: 90% !important; gap: 40px; }
      .widget1, .skills, .notes, .status, .pet, .londres, .widget-music, .me {
        width: calc(100% - 40px) !important;
        padding: 20px !important;
      }
      .album { width: 120px !important; height: 120px !important; }
      .vinyl, .disc { width: 110px !important; height: 110px !important; }
      .playing-state .vinyl, .playing-state .disc { transform: translateX(30px); }
      .contact-box h1 { position: relative !important; top: 0 !important; margin-bottom: 20px; }
    }

    @media (prefers-color-scheme: dark) {
      body { background: #f5f5f7 !important; color: #222 !important; }
      h1, h2, h3, h4, p, span { color: inherit !important; }
    }
  `;
  document.head.appendChild(style);

  const audio = document.getElementById('music-player');
  const playBtn = document.getElementById('play-pause-btn');
  const mainIcon = document.getElementById('main-icon');
  const progressBar = document.getElementById('progress-bar');
  const currentTimeTxt = document.getElementById('current-time');
  const durationTxt = document.getElementById('duration');
  const disc = document.querySelector('.disc');
  const badContainer = document.querySelector('.bad');

  const config = [
    { selector: '.widget1' }, { selector: '.skills' }, { selector: '.notes' },
    { selector: '.status' }, { selector: '.pet' }, { selector: '.londres' },
    { selector: '.widget-music' }, { selector: '.me' }, { selector: '.contact-box' }, { selector: '.box' }
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active-node');
        const children = entry.target.querySelectorAll('h1, h2, h4, p, span, i, .line3, .linkedin, .mail, .insta, .wpp');
        children.forEach((child, i) => {
          child.classList.add('child-reveal');
          child.style.transitionDelay = `${0.1 + (i * 0.05)}s`;
        });
      }
    });
  }, { threshold: 0.1 });

  config.forEach(item => {
    document.querySelectorAll(item.selector).forEach(el => {
      el.classList.add('parent-reveal');
      observer.observe(el);
    });
  });

  const togglePlay = () => {
    if (audio.paused) {
      audio.play();
      mainIcon.classList.replace('fa-play', 'fa-pause');
      badContainer.classList.add('playing-state');
      disc.style.animation = "spinDiscOnly 5.5s linear infinite";
    } else {
      audio.pause();
      mainIcon.classList.replace('fa-pause', 'fa-play');
      badContainer.classList.remove('playing-state');
      disc.style.animation = "none";
    }
  };

  playBtn?.addEventListener('click', togglePlay);
  audio?.addEventListener('timeupdate', () => {
    progressBar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
    const m = Math.floor(audio.currentTime / 60), s = Math.floor(audio.currentTime % 60);
    currentTimeTxt.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
  });
});