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

// Carregar os pesos salvos do Local Storage
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
  weights = itemWeights[item]; // Carregar os pesos salvos para o item selecionado
  updateModalPercentageList(); // Atualizar a lista de porcentagens no modal
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
