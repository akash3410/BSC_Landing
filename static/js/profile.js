document.addEventListener("DOMContentLoaded", () => {


  // ===== Mobile Sidebar Toggle (Profile) =====
  const sidebarToggleIcon = document.getElementById("sidebarToggleIcon");
  const sidebar = document.getElementById("profileSidebar");


  sidebarToggleIcon?.addEventListener("click", () => {
    sidebar.classList.toggle("-translate-x-full");
  });

  // ===== Menu Item & Content Switching =====
  const menuItems = document.querySelectorAll(".menu-item");
  const contents = document.querySelectorAll(".content");

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      menuItems.forEach((btn) => btn.classList.remove("bg-blue-900", "text-white"));
      item.classList.add("bg-blue-900", "text-white");

      const contentId = item.dataset.content;
      contents.forEach((c) => c.classList.add("hidden"));
      document.getElementById(contentId)?.classList.remove("hidden");

      if (window.innerWidth < 768) sidebar.classList.add("-translate-x-full");
    });
  });

  // ===== Optional: Close sidebar when clicking outside on mobile =====
  document.addEventListener("click", (e) => {
    if (window.innerWidth < 768 && !sidebar.contains(e.target) && !sidebarToggleIcon.contains(e.target)) {
      sidebar.classList.add("-translate-x-full");
    }
  });

  // ===== Reset sidebar visibility on window resize =====
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      sidebar.classList.remove("-translate-x-full"); // always visible on desktop
    } else {
      sidebar.classList.add("-translate-x-full"); // hidden on mobile by default
    }
  });

   // ===== Open specific section from URL parameter =====
  const params = new URLSearchParams(window.location.search);
  const openTab = params.get("tab");

  if (openTab) {
    const targetItem = document.querySelector(`.menu-item[data-content="${openTab}"]`);
    if (targetItem) {
      targetItem.click(); // sidebar click ট্রিগার করে content দেখাবে
    }
  }

});