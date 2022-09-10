import data from "./data.json" assert { type: "json" };
const activity = document.querySelectorAll(".activity__info");
const daily = document.querySelector(".daily");
const weekly = document.querySelector(".weekly");
const monthly = document.querySelector(".monthly");
console.log(data);
const dat1 = data.map(function (x) {
  return {
    tittle: x.title,
    daily: x.timeframes.daily,
  };
});
const title = [];
activity.forEach((el) => {
  const dt = el.querySelector(".title");
  title.push(dt.textContent);
});
const chaneTime = () => {
  const timeZone = data.map((x) => {
    return {
      title: x.title,
      zone: x.timeframes[localStorage.getItem("time") || "weekly"],
    };
  });
  activity.forEach((el) => {
    const title = el.querySelector(".title");
    const about = el.querySelector(".activity__text");
    const newTime = timeZone.filter((x) => {
      return x.title == title.textContent;
    });
    const html = `
    <h2 class="header-primary">${newTime[0].zone.current}hrs</h2>
    <p class="info">Last week - ${newTime[0].zone.previous}hrs</p>
    `;
    about.innerHTML = "";
    about.insertAdjacentHTML("afterbegin", html);
  });
  let current = document.querySelector(".active");
  let el = document.querySelector(
    `.${localStorage.getItem("time") || "weekly"}`
  );
  if (el == current) return;
  current.classList.remove("active");
  el.classList.add("active");
};
window.addEventListener("load", function () {
  chaneTime();
});
daily.addEventListener("click", function (e) {
  localStorage.setItem("time", "daily");

  chaneTime();
});
monthly.addEventListener("click", function (e) {
  localStorage.setItem("time", "monthly");

  chaneTime();
});
weekly.addEventListener("click", function (e) {
  localStorage.setItem("time", "weekly");
  chaneTime();
});
