

fetch('https://worldtimeapi.org/api/timezone/America/Sao_Paulo')
  .then(r => r.json())
  .then(d => {
    document.getElementById('data').textContent =
      new Date(d.datetime).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
  })
  .catch(() => {
    document.getElementById('data').textContent = dataLocal();
  });
