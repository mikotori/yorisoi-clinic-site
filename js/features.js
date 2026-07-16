const facilityModal = document.querySelector("#facilityModal");

const facilityModalImage = facilityModal.querySelector(
  ".facility_modal__image"
);

const facilityModalCaption = facilityModal.querySelector(
  ".facility_modal__caption"
);

const facilityModalClose = facilityModal.querySelector(
  ".facility_modal__close"
);

const facilityModalPrev = facilityModal.querySelector(
  ".facility_modal__arrow--prev"
);

const facilityModalNext = facilityModal.querySelector(
  ".facility_modal__arrow--next"
);

const facilityButtons = Array.from(
  document.querySelectorAll(".facility_overview__button")
);

let currentFacilityIndex = 0;

/**
 * 指定された番号の画像をモーダルに表示する
 */
const showFacilityImage = (index) => {
  /*
   * 先頭より前なら最後へ、
   * 最後より後なら先頭へ移動する
   */
  currentFacilityIndex =
    (index + facilityButtons.length) % facilityButtons.length;

  const currentButton = facilityButtons[currentFacilityIndex];

  const image = currentButton.querySelector("img");

  const label = currentButton.querySelector(
    ".facility_overview__label"
  );

  facilityModalImage.src = image.currentSrc || image.src;
  facilityModalImage.alt = image.alt;

  facilityModalCaption.textContent =
    label?.textContent.trim() || image.alt;
};

/**
 * モーダルを開く
 */
const openFacilityModal = (index) => {
  showFacilityImage(index);

  facilityModal.showModal();
  document.body.classList.add("is-modal-open");
};

/**
 * モーダルを閉じる
 */
const closeFacilityModal = () => {
  facilityModal.close();
};

/**
 * 一覧画像をクリック
 */
facilityButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    openFacilityModal(index);
  });
});

/**
 * 前の画像
 */
facilityModalPrev.addEventListener("click", () => {
  showFacilityImage(currentFacilityIndex - 1);
});

/**
 * 次の画像
 */
facilityModalNext.addEventListener("click", () => {
  showFacilityImage(currentFacilityIndex + 1);
});

/**
 * 閉じるボタン
 */
facilityModalClose.addEventListener("click", () => {
  closeFacilityModal();
});

/**
 * 黒い背景部分をクリックしたら閉じる
 */
facilityModal.addEventListener("click", (event) => {
  if (event.target === facilityModal) {
    closeFacilityModal();
  }
});

/**
 * キーボード操作
 */
document.addEventListener("keydown", (event) => {
  if (!facilityModal.open) {
    return;
  }

  if (event.key === "ArrowLeft") {
    showFacilityImage(currentFacilityIndex - 1);
  }

  if (event.key === "ArrowRight") {
    showFacilityImage(currentFacilityIndex + 1);
  }
});

/**
 * モーダルを閉じた後の処理
 */
facilityModal.addEventListener("close", () => {
  document.body.classList.remove("is-modal-open");

  facilityModalImage.src = "";
  facilityModalImage.alt = "";
  facilityModalCaption.textContent = "";
});