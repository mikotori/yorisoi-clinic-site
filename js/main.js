// mvの画像が切り替わるアニメーション
const slides = document.querySelectorAll("#js-slide img");
const slideLength = slides.length;

let current = 0;

const displayDuration = 4500;

// 画像が存在しない場合は処理を止める
if(slideLength > 0 ){
  // 最初の一枚だけ表示
  slides[current].classList.add("is_active");

  const slideshow = () => {
    const next = (current + 1) % slideLength;

    slides[current].classList.remove("is_active");
    slides[next].classList.add("is_active");

    current = next;
  };

  setInterval(slideshow, displayDuration);
}

// 診療案内
const tabButtons = document.querySelectorAll(".medical_tabs__button");
const tabPanels = document.querySelectorAll(".medical_tabs__panel");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetTab = button.dataset.tab;

    tabButtons.forEach((tabButton) => {
      const isSelected = tabButton === button;

      tabButton.classList.toggle("is-active", isSelected);
      tabButton.setAttribute("aria-selected", String(isSelected));
    });

    tabPanels.forEach((panel) => {
      const isTarget = panel.dataset.panel === targetTab;

      panel.classList.toggle("is-active", isTarget);
      panel.hidden = !isTarget;
    });
  });
});
// ハンバーガーメニュー
const menuToggle = document.querySelector(".menu_toggle");
const headerNav = document.querySelector(".header_nav");
const menuBackdrop = document.querySelector(".menu_backdrop");

if (menuToggle && headerNav && menuBackdrop) {
  const closeMenu = () => {
    menuToggle.classList.remove("is-open");
    headerNav.classList.remove("is-open");
    menuBackdrop.classList.remove("is-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "メニューを開く");

    document.body.classList.remove("is-menu-open");
  };

  const openMenu = () => {
    menuToggle.classList.add("is-open");
    headerNav.classList.add("is-open");
    menuBackdrop.classList.add("is-open");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "メニューを閉じる");

    document.body.classList.add("is-menu-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menuBackdrop.addEventListener("click", closeMenu);

  headerNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
}