function formatarHoje(data) {
  const opcoes = {
    weekday: "short",
    day: "2-digit",
    month: "long",
  };

  let texto = data
    .toLocaleDateString("pt-BR", opcoes)
    .replace(".", "")
    .toLowerCase();

  return `Hoje, ${texto}.`;
}

function hojeLocal() {
  return formatarHoje(new Date());
}

fetch("https://worldtimeapi.org/api/timezone/America/Sao_Paulo")
  .then((r) => r.json())
  .then((d) => {
    const el = document.getElementById("data1");
    if (!el) return;

    el.textContent = formatarHoje(new Date(d.datetime));
  })
  .catch(() => {
    const el = document.getElementById("data1");
    if (!el) return;

    el.textContent = hojeLocal();
  });
