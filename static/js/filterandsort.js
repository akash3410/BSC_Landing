// Filter By Button
const openFilterBtn = document.getElementById("openFilterBtn");
const closeFilterBtn = document.getElementById("closeFilterBtn");
const filterDrawer = document.getElementById("filterDrawer");
const overlay = document.getElementById("overlay");
const clearBtn = document.getElementById("clearFiltersBtn");
const filterInputs = document.querySelectorAll('#filterDrawer input[type="radio"]');

function openDrawer() {
  filterDrawer.classList.remove("translate-x-full");
  overlay.classList.remove("hidden");
}

function closeDrawer() {
  filterDrawer.classList.add("translate-x-full");
  overlay.classList.add("hidden");
}

openFilterBtn.addEventListener("click", openDrawer);
closeFilterBtn.addEventListener("click", closeDrawer);
overlay.addEventListener("click", closeDrawer);

// Show clear filter button when something is selected
filterInputs.forEach(input => {
  input.addEventListener("change", () => {
    clearBtn.classList.remove("hidden");
  });
});

// Clear filters
clearBtn.addEventListener("click", () => {
  filterInputs.forEach(input => input.checked = false);
  clearBtn.classList.add("hidden");
});

// Sort By
const btn = document.getElementById('dropdownBtn');
const menu = document.getElementById('dropdownMenu');

btn.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});

// Close if clicked outside
document.addEventListener('click', (e) => {
  if (!btn.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.add('hidden');
  }
});

// Update button text when item clicked
menu.querySelectorAll('li').forEach(item => {
  item.addEventListener('click', () => {
    btn.textContent = `Sort by: ${item.textContent}`;
    menu.classList.add('hidden');
  });
});


