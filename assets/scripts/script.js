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

ymaps.ready(function () {
  var myMap = new ymaps.Map("yandex-map", {
    center: [56.838, 60.598],
    zoom: 14,
    controls: ["zoomControl", "fullscreenControl"],
  });

  var myPlacemark = new ymaps.Placemark(
    [56.838, 60.598],
    {
      balloonContentHeader: "ул. Хохрякова, 61, Екатеринбург",
      balloonContentBody:
        '<p><strong>Телефон:</strong> <a href="tel:+79326109113">+7 932 610 91 13</a></p>' +
        '<p><strong>Почта:</strong> <a href="mailto:cck96@yandex.ru">Cck96@yandex.ru</a></p>' +
        "<p><strong>Часы работы:</strong> Пн-Вс: 10:00 - 21:00</p>",
      balloonContentFooter: "Контактная информация",
    },
    {
      preset: "islands#redDotIcon",
    }
  );

  myMap.geoObjects.add(myPlacemark);
  myPlacemark.balloon.open();
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
