document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById('music-player');
  const playBtn = document.getElementById('play-pause-btn');
  const mainIcon = document.getElementById('main-icon');
  const progressBar = document.getElementById('progress-bar');
  const currentTimeTxt = document.getElementById('current-time');
  const durationTxt = document.getElementById('duration');
  const restartBtn = document.getElementById('restart-btn');
  
  const album = document.querySelector('.album');
  const vinyl = document.querySelector('.vinyl');
  const disc = document.querySelector('.disc');
  const badContainer = document.querySelector('.bad');

  const style = document.createElement('style');
  style.textContent = `
    .bad { 
      position: relative; 
      display: flex; 
      align-items: center; 
      width: 100%; 
      overflow: visible;    
    }
    .album { 
      z-index: 5; 
      position: relative; 
    }
    .vinyl { 
      z-index: 3; 
      position: absolute; 
      left: 0;
      transition: transform 0.4s cubic-bezier(0.34, 1.26, 0.64, 1);
    }
    .disc { 
      z-index: 4; 
      position: absolute; 
      left: 0;
      transition: transform 0.4s cubic-bezier(0.34, 1.26, 0.64, 1);
    }
    
    
    
    .playing-state .vinyl { 
      transform: translateX(calc(100% - 60px)); 
    }
    
    .playing-state .disc { 
      transform: translateX(calc(100% - 60px));
    }

    @keyframes spinDiscOnly {
      from { transform: translateX(calc(100% - 60px)) rotate(0deg); }
      to { transform: translateX(calc(100% - 60px)) rotate(360deg); }
    }

    .spinning-disc {
      animation: spinDiscOnly 5.5s linear infinite !important;
    }
  `;
  document.head.appendChild(style);

  const formatTime = (s) => {
    const min = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const togglePlay = () => {
    if (audio.paused) {
      audio.play();
      mainIcon.classList.replace('fa-play', 'fa-pause');
      badContainer.classList.add('playing-state');
      setTimeout(() => {
        if(!audio.paused) disc.classList.add('spinning-disc');
      }, 900);
    } else {
      audio.pause();
      mainIcon.classList.replace('fa-pause', 'fa-play');
      badContainer.classList.remove('playing-state');
      disc.classList.remove('spinning-disc');
    }
  };

  audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentTimeTxt.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener('loadedmetadata', () => {
    durationTxt.textContent = formatTime(audio.duration);
  });

  playBtn.addEventListener('click', togglePlay);
  
  restartBtn.addEventListener('click', () => {
    audio.currentTime = 0;
    if (audio.paused) togglePlay();
  });

  document.querySelector('.bar-box').addEventListener('click', (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    audio.currentTime = (x / rect.width) * audio.duration;
  });
});