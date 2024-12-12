// DOM Elements
const habitInput = document.getElementById("habit-input");
const addHabitBtn = document.getElementById("add-habit");
const habitTableBody = document.getElementById("habit-table-body");

// Load habits from local storage
let habits = [];
try {
    const storedHabits = localStorage.getItem("habits");
    if (storedHabits) {
        habits = JSON.parse(storedHabits);
        console.log("Loaded habits from localStorage:", habits);
    }
} catch (error) {
    console.error("Failed to load habits from localStorage:", error);
}

// Function to render habits
function renderHabits() {
    habitTableBody.innerHTML = ""; // Clear the table before re-rendering
    habits.forEach((habit, index) => {
        const row = `
      <tr>
        <td>${habit.name}</td>
        ${habit.days.map((day, i) => `
          <td>
            <input type="checkbox" ${day ? "checked" : ""} 
              onchange="toggleDay(${index}, ${i})">
          </td>
        `).join("")}
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteHabit(${index})">
            Delete
          </button>
        </td>
      </tr>
    `;
        habitTableBody.insertAdjacentHTML("beforeend", row);
    });
}

// Function to save habits to localStorage and render them
function saveAndRender() {
    try {
        localStorage.setItem("habits", JSON.stringify(habits));
        console.log("Saved habits to localStorage:", habits);
    } catch (error) {
        console.error("Failed to save habits to localStorage:", error);
    }
    renderHabits();
}

// Function to toggle the completion of a habit for a specific day
function toggleDay(habitIndex, dayIndex) {
    habits[habitIndex].days[dayIndex] = !habits[habitIndex].days[dayIndex];
    console.log(`Toggled day ${dayIndex} for habit ${habitIndex}:`, habits[habitIndex].days);
    saveAndRender();
}

// Function to add a new habit
function addHabit() {
    const habitName = habitInput.value.trim();
    if (habitName === "") {
        alert("Habit name cannot be empty!");
        return;
    }
    const newHabit = {
        name: habitName,
        days: Array(7).fill(false)
    };
    habits.push(newHabit);
    habitInput.value = "";
    console.log("Added new habit:", newHabit);
    saveAndRender();
}

// Function to delete a habit
function deleteHabit(index) {
    console.log("Deleted habit:", habits[index]);
    habits.splice(index, 1);
    saveAndRender();
}
const value = localStorage.getItem("habits"); 
const parsedValue = JSON.parse(value);


// Event Listeners
addHabitBtn.addEventListener("click", addHabit);

// Initial render of habits
renderHabits();