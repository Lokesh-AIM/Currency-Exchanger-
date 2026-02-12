const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector("[name='from']");
const toCurr = document.querySelector("[name='to']");
const msg = document.querySelector(".msg");
const amount = document.querySelector(".amount input");

dropdowns.forEach((select) => {
  for (let curr in rates) {
    let option = document.createElement("option");
    option.value = curr;
    option.innerText = curr;

    if (select.name === "from" && curr === "USD") option.selected = true;

    if (select.name === "to" && curr === "INR") option.selected = true;

    select.appendChild(option);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
});

function updateFlag(element) {
  let currency = element.value;
  let country = countryMap[currency];

  let img = element.parentElement.querySelector("img");

  img.src = `https://flagsapi.com/${country}/flat/64.png`;
}

function convert() {
  let rawValue = amount.value;
  let amt = Number(rawValue);

  if (rawValue === "" || isNaN(amt) || amt <= 0) {
    msg.innerText = "Please enter valid amount";
    return;
  }

  let fromRate = rates[fromCurr.value];
  let toRate = rates[toCurr.value];

  let result = (amt * toRate) / fromRate;

  msg.innerText = `${amt} ${fromCurr.value} = ${result.toFixed(2)} ${toCurr.value}`;
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  convert();
});


convert();
