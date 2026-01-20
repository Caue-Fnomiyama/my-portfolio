async function loadWeather() {
  const res = await fetch("https://wttr.in/London?format=j1");
  const data = await res.json();

  const temp = data.current_condition[0].temp_C;
  const desc = data.current_condition[0].weatherDesc[0].value;

  document.getElementById("london-weather").innerText =
    `${temp}°C · ${desc}`;
}

function updateLondonTime() {
  const now = new Date();
  const londonTime = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit"
  }).format(now);

  document.getElementById("london-time").innerText = londonTime;
}

updateLondonTime();
setInterval(updateLondonTime, 60000);
loadWeather();