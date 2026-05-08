<div id="header"></div>

<script>
fetch("header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
  });
</script>
console.log("Genz Student Academy Loaded Successfully");
/* MOBILE MENU */

const menuToggle = document.getElementById("menu-toggle");

const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

  navLinks.classList.toggle("active");

});

/* DARK MODE */

const darkModeToggle = document.getElementById("dark-mode-toggle");

darkModeToggle.addEventListener("click", () => {

  document.body.classList.toggle("light-mode");

});
