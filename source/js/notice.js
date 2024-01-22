const ATTRIBUTE_NOTICE = 'data-quantity-notice';
const CLASS_NOTICE = '.user-list__quantity-notice';

const fillNotice = () => {
  const elementNotice = document.querySelector(CLASS_NOTICE);
  const valueNotice = Number(elementNotice.getAttribute(ATTRIBUTE_NOTICE));

  if (valueNotice > 99) {
    elementNotice.innerHTML = "99+";
  } else {
    elementNotice.innerHTML = valueNotice;
  }

  resizeElement(elementNotice, valueNotice);
};

const resizeElement = (elementNotice, valueNotice) => {
  if (valueNotice > 9 && valueNotice < 100) {
    setMetrics(elementNotice, 23);
  } else if (valueNotice > 99) {
    setMetrics(elementNotice, 25);
  }
};

const setMetrics = (elementNotice, value) => {
  elementNotice.style.width = `${value}px`;
  elementNotice.style.height = `${value}px`;
};

export const initFillNotice = () => {
  fillNotice();
};
