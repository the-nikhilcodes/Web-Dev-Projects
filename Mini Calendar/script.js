const daysEl = document.getElementById("days");
const monthSelect = document.getElementById("month");
const yearSelect = document.getElementById("year");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const themeBtn = document.getElementById("toggleTheme");

let date = new Date();

// Sample event dates (YYYY-MM-DD)
const events = ["2026-01-10", "2026-02-14", "2026-05-01", "2026-12-25"];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Populate selectors
monthNames.forEach((m, i) => {
  monthSelect.innerHTML += `<option value="${i}">${m}</option>`;
});

for (let y = 2020; y <= 2035; y++) {
  yearSelect.innerHTML += `<option value="${y}">${y}</option>`;
}

function renderCalendar() {
  daysEl.innerHTML = "";

  const year = yearSelect.value;
  const month = monthSelect.value;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, Number(month) + 1, 0).getDate();
  const today = new Date();

  for (let i = 0; i < firstDay; i++) {
    daysEl.innerHTML += `<div class="day inactive"></div>`;
  }

  for (let d = 1; d <= lastDate; d++) {
    const fullDate = `${year}-${String(Number(month) + 1).padStart(
      2,
      "0"
    )}-${String(d).padStart(2, "0")}`;

    let classes = "day";

    if (
      d === today.getDate() &&
      Number(month) === today.getMonth() &&
      Number(year) === today.getFullYear()
    ) {
      classes += " today";
    }

    if (events.includes(fullDate)) {
      classes += " event";
    }

    daysEl.innerHTML += `<div class="${classes}" onclick="alert('Date: ${fullDate}')">${d}</div>`;
  }
}

monthSelect.value = date.getMonth();
yearSelect.value = date.getFullYear();

monthSelect.onchange = renderCalendar;
yearSelect.onchange = renderCalendar;

prevBtn.onclick = () => {
  monthSelect.value--;
  if (monthSelect.value < 0) {
    monthSelect.value = 11;
    yearSelect.value--;
  }
  renderCalendar();
};

nextBtn.onclick = () => {
  monthSelect.value++;
  if (monthSelect.value > 11) {
    monthSelect.value = 0;
    yearSelect.value++;
  }
  renderCalendar();
};

themeBtn.onclick = () => {
  document.body.classList.toggle("dark");
  themeBtn.textContent = document.body.classList.contains("dark")
    ? "☀ Light Mode"
    : "🌙 Dark Mode";
};

renderCalendar();
