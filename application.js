const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const bttn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const mssg = document.querySelector(".mssg p");

// Add currency options in dropdowns
for (let select of dropdowns) {
  for (let currcode in countryList) {
    let newoption = document.createElement("option");

    newoption.innerText = currcode;
    newoption.value = currcode;

    // Default selected values
    if (select.name === "from" && currcode === "USD") {
      newoption.selected = "selected";
    } else if (select.name === "To" && currcode === "INR") {
      newoption.selected = "selected";
    }

    select.append(newoption);
  }

  // Update flag when currency changes
  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

// Function to update flag image
const updateflag = (element) => {
  let currcode = element.value;
  let countrycode = countryList[currcode];

  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;

  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};

// Function to update exchange rate
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;

  // Validation
  if (amtval === "" || amtval <= 0) {
    amtval = 1;
    amount.value = "1";
  }

  // API URL
  const url = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

  try {
    let response = await fetch(url);
    let data = await response.json();

    let rate =
      data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalval = amtval * rate;

    mssg.innerText = `${amtval} ${fromCurr.value} = ${finalval.toFixed(
      2
    )} ${toCurr.value}`;
  } catch (error) {
    mssg.innerText = "Something went wrong!";
    console.log(error);
  }
};

// Button click event
bttn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

// Load default exchange rate on page load
window.addEventListener("load", () => {
  updateExchangeRate();
});