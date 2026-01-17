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

$(document).ready(function () {
  const $carousels = $(".owl-carousel");

  if (!$carousels.length) return;

  $carousels.each(function () {
    $(this).owlCarousel({
      loop: true,
      center: true,
      nav: true,
      dots: true,
      margin: 16,
      stagePadding: 100,
      smartSpeed: 600,
      navText: [
        `<svg width="19" height="32" viewBox="0 0 19 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.1421 2L2.99998 16.1421L17.1421 30.2843" stroke="currentColor" stroke-width="3"/>
        </svg>`,
        `<svg width="18" height="32" viewBox="0 0 18 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.14215 2L15.2843 16.1421L1.14215 30.2843" stroke="currentColor" stroke-width="3"/>
        </svg>`,
      ],
      responsive: {
        0: {
          items: 1,
          center: true,
          stagePadding: 0,
        },
        768: {
          items: 1,
          center: true,
          stagePadding: 0,
        },
        1024: {
          items: 1,
          center: true,
          stagePadding: 100,
        },
      },
    });
  });
});

lightbox.option({
  resizeDuration: 100,
  fadeDuration: 100,
  imageFadeDuration: 100,
  wrapAround: true,
});

document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector(".about-us__toggle");
  const moreText = document.querySelector(".about-us__more");

  if (!toggleBtn || !moreText) return;

  toggleBtn.addEventListener("click", function () {
    moreText.classList.toggle("is-open");
    toggleBtn.textContent = moreText.classList.contains("is-open")
      ? "Скрыть"
      : "Подробнее";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const phoneInput = document.getElementById("feedback-phone");

  if (phoneInput) {
    IMask(phoneInput, {
      mask: "+{7} (000) 000-00-00",
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("feedback-form");
  if (!form) return;

  const action = form.getAttribute("action");
  const endpoint = action && action !== "" ? action : "../../send.php";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.status === "success") {
        alert(data.message || "Заявка отправлена. Мы свяжемся с вами.");
        form.reset();
      } else {
        alert(data?.message || "Ошибка отправки. Попробуйте позже.");
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка соединения с сервером.");
    }
  });
});
