const music = document.getElementById('music-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const mainIcon = document.getElementById('main-icon');
const restartBtn = document.getElementById('restart-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// 1. Função Play/Pause
playPauseBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        mainIcon.classList.replace('fa-play', 'fa-pause');
    } else {
        music.pause();
        mainIcon.classList.replace('fa-pause', 'fa-play');
    }
});

// 2. Reiniciar Música
restartBtn.addEventListener('click', () => {
    music.currentTime = 0;
});

// 3. Atualizar Barra e Timer
music.addEventListener('timeupdate', () => {
    const { duration, currentTime } = music;
    
    // Atualiza a largura da barra (porcentagem)
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Formatação do tempo atual
    currentTimeEl.innerText = formatTime(currentTime);
});

// 4. Carregar duração total quando o arquivo abrir
music.addEventListener('loadedmetadata', () => {
    durationEl.innerText = formatTime(music.duration);
});

// Função auxiliar para formatar segundos em 0:00
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Quando a música acabar, volta o ícone para Play
music.addEventListener('ended', () => {
    mainIcon.classList.replace('fa-pause', 'fa-play');
});