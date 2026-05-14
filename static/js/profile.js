// ------------- Top Navbar show & hide on scroll ------------------
let lastScrollTop = 0;
const topNavbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    navbar.style.transform = "translateY(-100%)";
  }
  else {
    navbar.style.transform = "translateY(0)";
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// ---------- Scroll Animate Section (Global)-----------
  const scrollElements = document.querySelectorAll('.scroll-animate');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.remove('opacity-0', 'translate-y-10');
        entry.target.classList.add('opacity-100', 'translate-y-0');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0 });

  scrollElements.forEach(el => observer.observe(el));


// ---------------- Mobile slide menu toggle ----------------
document.addEventListener("DOMContentLoaded", function() {
  const menuBtn = document.getElementById('menu-btn');
  const closeMenu = document.getElementById('close-menu');
  const mobileMenu = document.getElementById('mobile-menu');

  menuBtn?.addEventListener('click', () => mobileMenu?.classList.remove('-translate-x-full'));
  closeMenu?.addEventListener('click', () => mobileMenu?.classList.add('-translate-x-full'));

  document.querySelectorAll('.submenu-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const submenu = btn.nextElementSibling;
      submenu.classList.toggle('hidden');
      const sign = btn.querySelector('span');
      if(sign) sign.textContent = submenu.classList.contains('hidden') ? '+' : '-';
    });
  });

  // ---------------- Mobile & Desktop search toggle ----------------
  const mobileSearchBtn = document.getElementById('mobile-search-btn');
  const mobileSearchBar = document.getElementById('mobile-search-bar');
  const desktopSearchBtn = document.getElementById('desktop-search-btn');
  const desktopSearchWrap = document.getElementById('desktop-search');
  const desktopSearchInput = document.getElementById('desktop-search-input');

  mobileSearchBtn?.addEventListener('click', () => {
    mobileSearchBar?.classList.toggle('-translate-y-full');
    setTimeout(() => {
      const input = document.getElementById('mobile-search-input');
      if (input && !mobileSearchBar.classList.contains('-translate-y-full')) input.focus();
    }, 200);
  });

  desktopSearchBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (desktopSearchWrap.classList.contains('w-0')) {
      desktopSearchWrap.classList.replace('w-0', 'w-64');
      setTimeout(() => desktopSearchInput?.focus(), 150);
    } else {
      desktopSearchWrap.classList.replace('w-64', 'w-0');
    }
  });

  document.addEventListener('click', (e) => {
    if (!desktopSearchWrap?.contains(e.target) && !desktopSearchBtn?.contains(e.target)) {
      desktopSearchWrap?.classList.replace('w-64', 'w-0');
    }
  });

  // ---------------- Mobile search icon text toggle ----------------
  let isOpen = false;
  const searchIcon = document.getElementById("mobile-search-icon");
  const searchText = document.getElementById("mobile-search-text");

  mobileSearchBtn?.addEventListener("click", () => {
    isOpen = !isOpen;
    if(isOpen) {
      mobileSearchBar?.classList.replace("-translate-y-full","translate-y-0");
      searchIcon?.classList.replace("fa-magnifying-glass","fa-xmark");
      if(searchText) searchText.innerText = "Close";
    } else {
      mobileSearchBar?.classList.replace("translate-y-0","-translate-y-full");
      searchIcon?.classList.replace("fa-xmark","fa-magnifying-glass");
      if(searchText) searchText.innerText = "Search";
    }
  });

  // ---------------- resize fix ----------------
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      mobileMenu?.classList.add('-translate-x-full');
      mobileSearchBar?.classList.add('-translate-y-full');
    }
  });

  // ---------------- Slider ----------------
  const slider = document.getElementById("slider");
  const slides = slider ? slider.querySelectorAll(":scope > div") : [];
  const dots = document.querySelectorAll(".dot");
  let index = 0;

  function updateSlide() {
    if(slider){
      slider.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot,i) => {
        dot.classList.toggle("bg-white", i===index);
        dot.classList.toggle("bg-gray-400", i!==index);
      });
      slides.forEach(slide => {
        slide.querySelectorAll(".slide-text").forEach(el => {
          el.classList.add("opacity-0","translate-y-10");
          el.classList.remove("opacity-100","translate-y-0");
        });
      });
      slides[index]?.querySelectorAll(".slide-text").forEach((el,i)=>{
        setTimeout(()=> {
          el.classList.remove("opacity-0","translate-y-10");
          el.classList.add("opacity-100","translate-y-0");
        }, i*200);
      });
    }
  }

  updateSlide();

  document.getElementById("next")?.addEventListener("click",()=>{index=(index+1)%slides.length;updateSlide();});
  document.getElementById("prev")?.addEventListener("click",()=>{index=(index-1+slides.length)%slides.length;updateSlide();});
  dots.forEach((dot,i)=>{dot.addEventListener("click",()=>{index=i;updateSlide();});});
  setInterval(()=>{index=(index+1)%slides.length;updateSlide();},3000);

  // ---------------- Why Us carousel ----------------
  feather.replace();
  const carousel = document.getElementById('carousel');
  const gap = 24;

  function slideNext() {
    if(!carousel) return;
    const first = carousel.children[0];
    const last = carousel.children[carousel.children.length - 2];
    const cardWidth = first.offsetWidth + gap;
    last?.classList.add('slide-enlarge');
    carousel.style.transition = 'transform 1s linear';
    carousel.style.transform = `translateX(-${cardWidth}px)`;
    setTimeout(()=>{
      carousel.style.transition='none';
      carousel.style.transform='translateX(0)';
      carousel.appendChild(first);
      last?.classList.remove('slide-enlarge');
    },1000);
  }
  setInterval(slideNext,2000);

  document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('mouseenter',()=>card.querySelectorAll('h3').forEach(el=>el.classList.add('bounce-up')));
    card.addEventListener('mouseleave',()=>card.querySelectorAll('h3').forEach(el=>el.classList.remove('bounce-up')));
  });

  // ---------------- Product modal ----------------
  document.querySelectorAll('.open-modal').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const target=document.getElementById(btn.dataset.target);
      target?.classList.add('active');
    });
  });

  document.querySelectorAll('.close-modal').forEach(btn=>{
    btn.addEventListener('click',()=>btn.closest('.modal')?.classList.remove('active'));
  });

  document.querySelectorAll('.modal-thumb').forEach(thumb=>{
    thumb.addEventListener('click',()=>thumb.closest('.modal').querySelector('.main-img').src=thumb.src);
  });

  // ---------------- Zoom lens ----------------
  const zoom=2;
  document.querySelectorAll('.zoom-container').forEach(container=>{
    const lens=container.querySelector('.lens');
    const image=container.querySelector('img');
    container?.addEventListener('mousemove',(e)=>{
      if(!lens || !image) return;
      lens.style.display='block';
      lens.style.backgroundImage=`url(${image.src})`;
      lens.style.backgroundSize=`${image.width*zoom}px ${image.height*zoom}px`;
      const rect=container.getBoundingClientRect();
      let x=e.clientX-rect.left-lens.offsetWidth/2;
      let y=e.clientY-rect.top-lens.offsetHeight/2;
      if(x<0) x=0; if(y<0) y=0;
      if(x>rect.width-lens.offsetWidth) x=rect.width-lens.offsetWidth;
      if(y>rect.height-lens.offsetHeight) y=rect.height-lens.offsetHeight;
      lens.style.left=x+'px';
      lens.style.top=y+'px';
      lens.style.backgroundPosition=`-${x*zoom}px -${y*zoom}px`;
    });
    container?.addEventListener('mouseleave',()=>lens.style.display='none');
  });

  // ---------------- Scroll to top button ----------------
  const scrollTopBtn=document.getElementById("scrollTopBtn");
  const navbar=document.querySelector("nav");
  const footer=document.querySelector("footer");

  window.addEventListener("scroll",function(){
    const footerTop=footer?.getBoundingClientRect().top||0;
    const windowHeight=window.innerHeight;
    const width=this.window.innerWidth;

    if(footerTop<windowHeight){
      if(scrollTopBtn) scrollTopBtn.style.display="block";
    } else {
      if(scrollTopBtn) scrollTopBtn.style.display="none";
    }
  });

  scrollTopBtn?.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

  
  // ---------------- Cart sidebar ----------------
  const cartBtn=document.getElementById("myCartBtn");
  const cartSidebar=document.getElementById("cartSidebar");
  const closeCart=document.getElementById("closeCart");
  cartBtn?.addEventListener("click",()=>{cartSidebar?.classList.remove("translate-x-full");cartSidebar?.classList.add("translate-x-0");});
  closeCart?.addEventListener("click",()=>{cartSidebar?.classList.remove("translate-x-0");cartSidebar?.classList.add("translate-x-full");});

    // ---------------- Cart button slide-in on page load ----------------
  document.addEventListener("DOMContentLoaded", () => {
    if (!cartBtn) return;

    setTimeout(() => {
        cartBtn.classList.remove("-translate-y-20", "opacity-0");
        cartBtn.classList.add("translate-y-0", "opacity-100");
    }, 300); // 300ms delay
  });

  // ---------------- Filter drawer & Sort by ----------------
  const openFilterBtn = document.getElementById("openFilterBtn");
  const closeFilterBtn = document.getElementById("closeFilterBtn");
  const filterDrawer = document.getElementById("filterDrawer");
  const overlay = document.getElementById("overlay");
  const clearBtn = document.getElementById("clearFiltersBtn");
  const filterInputs = document.querySelectorAll('#filterDrawer input[type="radio"]');

  function openDrawer(){filterDrawer?.classList.remove("translate-x-full");overlay?.classList.remove("hidden");}
  function closeDrawer(){filterDrawer?.classList.add("translate-x-full");overlay?.classList.add("hidden");}
  openFilterBtn?.addEventListener("click",openDrawer);
  closeFilterBtn?.addEventListener("click",closeDrawer);
  overlay?.addEventListener("click",closeDrawer);

  filterInputs.forEach(input=>{input.addEventListener("change",()=>clearBtn?.classList.remove("hidden"));});
  clearBtn?.addEventListener("click",()=>{filterInputs.forEach(input=>input.checked=false);clearBtn?.classList.add("hidden");});

  const btn = document.getElementById('dropdownBtn');
  const menu = document.getElementById('dropdownMenu');

  btn?.addEventListener('click',()=>menu?.classList.toggle('hidden'));
  document.addEventListener('click',(e)=>{if(btn && menu && !btn.contains(e.target) && !menu.contains(e.target)) menu.classList.add('hidden');});
  menu?.querySelectorAll('li').forEach(item=>item.addEventListener('click',()=>{btn.textContent=`Sort by: ${item.textContent}`;menu.classList.add('hidden');}));
});

// Animation at Scroll on Navbar
const navbar = document.getElementById("navbar");
let lastScrollY = 0;

window.addEventListener("scroll", () => {
  if (window.scrollY > 10 && lastScrollY <= 10) {
    // নিচে নামলে drop animation
    navbar.classList.add("drop-animation");
  } else if (window.scrollY <= 10 && lastScrollY > 10) {
    // আবার উপরে গেলে lift animation
    navbar.classList.remove("drop-animation");
  }
  lastScrollY = window.scrollY;
});

// Animation Cart (Smooth Ease In)
document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".smooth-ease-in"); // product grid wrapper
    if (!grid) return;

    grid.classList.add("opacity-0", "scale-95"); // শুরুতে hidden + slightly down
    setTimeout(() => {
        grid.classList.remove("opacity-0", "scale-95");
        grid.classList.add("opacity-100", "scale-100", "transition-all", "duration-1000", "ease-in");
    }, 100); // short delay for smooth start
});

document.addEventListener("DOMContentLoaded", () => {
    const cartBtn = document.getElementById("myCartBtn");
    if (!cartBtn) return;

    setTimeout(() => {
        cartBtn.classList.remove("-translate-y-20", "opacity-0");
        cartBtn.classList.add("translate-y-0", "opacity-100", "transition-all", "duration-1000", "ease-out");
    }, 200); // 200ms delay, adjust as needed
});


// ================= New Arrival Slider =================
const sliderTrack = document.getElementById("sliderTrack");
const naPrev = document.getElementById("naprev");
const naNext = document.getElementById("nanext");

let currentIndex = 0;
const cardWidth = 320 + 32; // card width (w-80 ≈ 320px) + gap-8 (32px)
const totalCards = sliderTrack ? sliderTrack.children.length : 0;

function updateSlider() {
  if (sliderTrack) {
    sliderTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }
}

// Next button
naNext?.addEventListener("click", () => {
  if (currentIndex < totalCards - 1) {
    currentIndex++;
    updateSlider();
  }
});

// Previous button
naPrev?.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

// Hover এ button show/hide
const naWrapper = document.getElementById("naSliderWrapper");
naWrapper?.addEventListener("mouseenter", () => {
  naPrev?.classList.remove("opacity-0", "-translate-x-10");
  naNext?.classList.remove("opacity-0", "translate-x-10");
});
naWrapper?.addEventListener("mouseleave", () => {
  naPrev?.classList.add("opacity-0", "-translate-x-10");
  naNext?.classList.add("opacity-0", "translate-x-10");
});


// ================= Reusable Slider Function =================
function initSlider(wrapperId, trackId, prevId, nextId) {
  const wrapper = document.getElementById(wrapperId);
  const track = document.getElementById(trackId);
  const prev = document.getElementById(prevId);
  const next = document.getElementById(nextId);

  if (!wrapper || !track) return;

  let currentIndex = 0;
  const cardWidth = 320 + 32; // w-80 (≈320px) + gap-8 (32px)
  const totalCards = track.children.length;

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  next?.addEventListener("click", () => {
    if (currentIndex < totalCards - 1) {
      currentIndex++;
      updateSlider();
    }
  });

  prev?.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  // Hover এ button show/hide
  wrapper.addEventListener("mouseenter", () => {
    prev?.classList.remove("opacity-0", "-translate-x-10");
    next?.classList.remove("opacity-0", "translate-x-10");
  });
  wrapper.addEventListener("mouseleave", () => {
    prev?.classList.add("opacity-0", "-translate-x-10");
    next?.classList.add("opacity-0", "translate-x-10");
  });
}

// ================= Initialize Sliders =================
initSlider("sliderWrapper", "sliderTrack", "prev", "next");       // New Arrival
initSlider("bssliderWrapper", "bsSliderTrack", "bsprev", "bsnext"); // Best Sell


// Main Cart
function updateQty(btn, change, itemId, price) {
  const qtyInput = document.getElementById(`qty-${itemId}`);
  let qty = parseInt(qtyInput.value);

  qty = Math.max(1, qty + change);
  qtyInput.value = qty;

  document.getElementById(`item-total-${itemId}`).innerText = "$" + (qty * price).toFixed(2);

  updateCartSummary();
}

function updateCartSummary() {
  let subtotal = 0;
  document.querySelectorAll("[id^='item-total-']").forEach(el => {
    subtotal += parseFloat(el.innerText.replace("$", ""));
  });

  document.getElementById("subtotal").innerText = "$" + subtotal.toFixed(2);

  const vat = subtotal * 0.05;
  document.getElementById("vat").innerText = "$" + vat.toFixed(2);

  const discount = ((subtotal+vat) * 5)/100;
  document.getElementById("discount").innerText = "-$" + discount.toFixed(2);

  const total = subtotal + vat - discount;
  document.getElementById("total").innerText = "$" + total.toFixed(2);
}

function prepareCartData() {
  let cart = {};
  document.querySelectorAll("[id^='qty-']").forEach(input => {
    const id = input.id.replace("qty-", "");
    cart[id] = parseInt(input.value);
  });
  console.log("Cart data ready for backend:", cart);
}


// District -> Thana mapping
const thanaData = {
  dhaka: ["Mirpur", "Dhanmondi", "Uttara", "Banani"],
  chattogram: ["Pahartali", "Kotwali", "Patenga", "Halishahar"],
  rajshahi: ["Boalia", "Motihar", "Shah Makhdum", "Rajpara"],
  sylhet: ["Beanibazar", "Zakiganj", "Golapganj", "Companiganj"]
};

// Make searchable dropdown (safe version)
function searchable(inputId, listId, callback) {
  const input = document.getElementById(inputId);
  const list = document.getElementById(listId);

  if (!input || !list) {
    console.warn(`Input or list not found for IDs: ${inputId}, ${listId}`);
    return;
  }

  input.addEventListener("focus", () => list.classList.remove("hidden"));

  input.addEventListener("input", () => {
    const filter = input.value.toLowerCase();
    [...list.getElementsByTagName("li")].forEach(li => {
      li.style.display = li.textContent.toLowerCase().includes(filter) ? "" : "none";
    });
  });

  list.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      input.value = e.target.textContent;
      list.classList.add("hidden");
      if (callback) callback(e.target.textContent); // pass selected district/thana
    }
  });

  document.addEventListener("click", (e) => {
    if (!input.parentElement.contains(e.target)) {
      list.classList.add("hidden");
    }
  });
}

// Initialize district dropdown only if elements exist
if (document.getElementById("districtInput") && document.getElementById("districtList")) {
  searchable("districtInput", "districtList", (selectedDistrict) => {
    const thanaInput = document.getElementById("thanaInput");
    const thanaList = document.getElementById("thanaList");

    if (!thanaInput || !thanaList) return;

    // Enable thana input
    thanaInput.disabled = false;
    thanaInput.value = "";
    thanaInput.placeholder = "Search Thana...";

    // Clear old thana list
    thanaList.innerHTML = "";

    // Populate new thana list
    const thanas = thanaData[selectedDistrict.toLowerCase()] || [];
    thanas.forEach(thana => {
      const li = document.createElement("li");
      li.textContent = thana;
      li.className = "px-3 py-2 hover:bg-blue-100 cursor-pointer";
      thanaList.appendChild(li);
    });

    // Re-init searchable for thana
    searchable("thanaInput", "thanaList");
  });
}

// Popup Banner
document.addEventListener("DOMContentLoaded", function() {
  const banner = document.getElementById("popupBanner");
  const bannerCard = banner.querySelector("div");
  const closeBtn = document.getElementById("closeBanner");

  // Show banner after 0.5s
  setTimeout(() => {
    banner.classList.remove("hidden", "opacity-0");
    banner.classList.add("opacity-100");
    bannerCard.classList.remove("scale-95");
    bannerCard.classList.add("scale-100");
  }, 1000);

  // Auto close after 5 seconds
  setTimeout(() => {
    banner.classList.replace("opacity-100", "opacity-0");
    bannerCard.classList.replace("scale-100", "scale-95");
    setTimeout(() => banner.classList.add("hidden"), 500);
  }, 7500);

  // Manual close
  closeBtn.addEventListener("click", () => {
    banner.classList.replace("opacity-100", "opacity-0");
    bannerCard.classList.replace("scale-100", "scale-95");
    setTimeout(() => banner.classList.add("hidden"), 500);
  });
});