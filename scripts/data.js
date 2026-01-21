function formatarData(data) {
  const opcoes = {
    weekday: 'short',
    day: '2-digit',
    month: 'long'
  };

  let texto = data
    .toLocaleDateString('pt-BR', opcoes)
    .replace('.', '');

  texto = texto.charAt(0).toUpperCase() + texto.slice(1);

  return texto + '.';
}

function dataLocal() {
  return formatarData(new Date());
}

fetch('https://worldtimeapi.org/api/timezone/America/Sao_Paulo')
  .then(r => r.json())
  .then(d => {
    document.getElementById('data').textContent =
      formatarData(new Date(d.datetime));
  })
  .catch(() => {
    document.getElementById('data').textContent = dataLocal();
  });
