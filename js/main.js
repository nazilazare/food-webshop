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
