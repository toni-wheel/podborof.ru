document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".service-card").forEach((card) => {
    const button = card.querySelector(".service-card__more");
    const list = card.querySelector(".service-card__list");
    if (!button || !list) return;

    const items = list.querySelectorAll("li");
    if (items.length <= 2) {
      button.classList.add("is-hidden");
      return;
    }

    button.addEventListener("click", (e) => {
      e.preventDefault();
      const expanded = card.classList.toggle("is-expanded");
      button.textContent = expanded ? "Свернуть" : "Подробнее";
    });
  });
});
