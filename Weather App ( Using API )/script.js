const btn = document.getElementById("searchBtn");
const cityInput = document.getElementById("city");
const result = document.getElementById("result");

btn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    result.textContent = `Weather info for ${city} coming soon 🌦️`;
  } else {
    result.textContent = "Please enter a city name!";
  }
});
