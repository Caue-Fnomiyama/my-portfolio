function updateLondonTime() {
  const timeEl = document.getElementById("london-time");
  if (!timeEl) return;

  const now = new Date();
  const londonTime = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit"
  }).format(now);

  timeEl.innerText = londonTime;
}

updateLondonTime();
setInterval(updateLondonTime, 60000);
