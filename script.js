let selectedItem = "";
let weights = [];
const itemWeights = {
  "Back Squat": [],
  "Front Squat": [],
  Deadlift: [],
  "Squat Clean": [],
  "Power Clean": [],
  "Clean & Jerk": [],
  "Shoulder Press": [],
  "Push Press": [],
  "Push Jerk": [],
  "Split Jerk": [],
  "Power Snatch": [],
  "Squat Snatch": [],
  "Over Head Squat": [],
};

for (const item in itemWeights) {
  if (localStorage.getItem(item)) {
    itemWeights[item] = JSON.parse(localStorage.getItem(item));
  }
}

function saveWeightsToLocalStorage() {
  for (const item in itemWeights) {
    localStorage.setItem(item, JSON.stringify(itemWeights[item]));
  }
}

function openModal(item) {
  const modal = document.getElementById("myModal");
  const modalItemName = document.getElementById("modal-item-name");
  modalItemName.textContent = item;
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}

function selectItem(item) {
  selectedItem = item;
  openModal(item);
  weights = itemWeights[item]; 
  updateModalPercentageList(); 
}

function addWeightModal() {
  const weightInput = document.getElementById("modal-weight-input");
  const weight = parseFloat(weightInput.value);
  if (!isNaN(weight)) {
    itemWeights[selectedItem].push(weight);
    updateModalPercentageList();
    saveWeightsToLocalStorage();
    weightInput.value = "";
  }
}

function updatePercentageList() {
  const percentageList = document.getElementById("percentage-list");
  percentageList.innerHTML = "";

  for (let percentage = 5; percentage <= 100; percentage += 5) {
    const listItem = document.createElement("li");
    listItem.textContent = `${percentage}%: ${calculatePercentageValue(
      weights[weights.length - 1],
      percentage
    )} Lbs`;
    percentageList.appendChild(listItem);
  }
}

function updateModalPercentageList() {
  const percentageList = document.getElementById("modal-percentage-list");
  percentageList.innerHTML = "";

  for (let percentage = 5; percentage <= 110; percentage += 5) {
    const listItem = document.createElement("li");
    listItem.textContent = `${percentage}%: ${calculatePercentageValue(
      weights[weights.length - 1],
      percentage
    )} Lbs`;

    const showPlatesButton = document.createElement("span");
    showPlatesButton.innerHTML = `<button id='plate' onclick="showPlates(${percentage})"> </button>`;
    listItem.appendChild(showPlatesButton);

    percentageList.appendChild(listItem);
  }
}

function calculatePercentageValue(baseWeight, percentage) {
  return (baseWeight * percentage) / 100;
}

function calculateModalPercentage() {
  const percentageInput = document.getElementById("modal-percentage-input");
  const percentage = parseFloat(percentageInput.value);
  if (!isNaN(percentage) && weights.length > 0) {
    const calculatedWeight = calculatePercentageValue(
      weights[weights.length - 1],
      percentage
    );
    const calculatedResultDiv = document.getElementById(
      "modal-calculated-result"
    );
    calculatedResultDiv.textContent = `Peso calculado: ${calculatedWeight.toFixed(
      2
    )} Lbs`;
  }
}

function showPlates(percentage) {
  const platesModal = document.getElementById("platesModal");
  platesModal.style.display = "block";

  const platesList = document.getElementById("plates-list");
  platesList.innerHTML = "";

  const totalWeight = calculatePercentageValue(
    weights[weights.length - 1],
    percentage
  );

  const availablePlates = [45, 35, 25, 10, 5, 2.5]; 

  const barDescriptions = {
    male: "Barra Masculina",
    female: "Barra Feminina",
  };

  const plates = {};

  for (const barType in barDescriptions) {
    const barWeight = barType === "female" ? 35 : 45; 

    let remainingWeight = totalWeight - barWeight;
    const barPlates = [];

    
    if (remainingWeight > 0) {
      remainingWeight /= 2;

      for (const plate of availablePlates) {
        const plateCount = Math.floor(remainingWeight / plate);
        if (plateCount > 0) {
          const plateText = `${plateCount}x ${plate} lbs`;
          barPlates.push(plateText);
          remainingWeight -= plateCount * plate;
        }
      }
    }

    plates[barType] = {
      description: barDescriptions[barType],
      weight: barWeight,
      plates: barPlates,
    };
  }


  for (const barType in plates) {
    const bar = plates[barType];
    const listItem = document.createElement("li");
    const platesText = bar.plates.map(plate => `+ ${plate} lbs`).join("<br>");
    listItem.innerHTML = `${bar.description}<br>${platesText}`;
    platesList.appendChild(listItem);
  }}
function closePlatesModal() {
  const platesModal = document.getElementById("platesModal");
  platesModal.style.display = "none";
}

const btnLpo = document.getElementById("btn-Lpo");
btnLpo.addEventListener("click", () => {
  window.location.href = "Lpo.html";
});