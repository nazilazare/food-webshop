const drawer = document.getElementById("drawer");
const backdrop = document.getElementById("backdrop");
const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");

function openMenu(){
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  backdrop.hidden = false;
  openBtn.setAttribute("aria-expanded", "true");
  closeBtn.focus();
}
function closeMenu(){
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  backdrop.hidden = true;
  openBtn.setAttribute("aria-expanded", "false");
  openBtn.focus();
}

openBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
backdrop.addEventListener("click", closeMenu);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && drawer.classList.contains("is-open")) closeMenu();
});

// Shopping cart functionality
function getCartCount() {
  return parseInt(localStorage.getItem('cartCount') || '0', 10);
}

function setCartCount(count) {
  localStorage.setItem('cartCount', count.toString());
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartBtn = document.querySelector('.cart-btn');
  if (cartBtn) {
    const count = getCartCount();
    cartBtn.textContent = count > 0 ? count : '0';
  }
}

function addToCart() {
  const currentCount = getCartCount();
  setCartCount(currentCount + 1);
}

function resetCart() {
  setCartCount(0);
}

// Initialize cart display on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartDisplay();
  
  // Add click handlers to all "Add to basket" buttons
  const addButtons = document.querySelectorAll('.product__btn');
  addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      addToCart();
    });
  });
  
  // Reset cart when clicking the cart button (or hold Shift+Click to just navigate)
  const cartBtn = document.querySelector('.cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', (e) => {
      if (!e.shiftKey && getCartCount() > 0) {
        e.preventDefault();
        if (confirm('Clear cart?')) {
          resetCart();
        }
      }
    });
  }
});
