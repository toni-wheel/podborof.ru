const serviceCard = document.querySelectorAll(".service-card");
const popup = document.querySelector(".popup");

serviceCard.forEach((card) => {
  card.addEventListener("click", (e) => {
    e.preventDefault();
  });
});
