const ATTRIBUTE_PROGRESS = 'data-progress-percent';
const CLASS_CIRCLE = '.indicator__progress-circle';
const CLASS_INDICATOR = '.indicator';
const CLASS_PROGRESS_VALUE = '.indicator__progress-value';

const fillProgressBar = (indicator, progress) => {
  const circle = indicator.querySelector(CLASS_CIRCLE);
  const radius = circle.r.baseVal.value;
  const circumReference = 2 * Math.PI * radius;
  const offset = circumReference * ((100 - progress) / 100);
  circle.style.strokeDashoffset = offset;
}

const fillProgressValue = (indicator, progress) => {
  const elementValue = indicator.querySelector(CLASS_PROGRESS_VALUE);
  const speed = 30;
  let progressStart = 0;

  const fillValue = setInterval((elementValue, progress) => {
    progressStart++;

    elementValue.textContent = progressStart;

    if (progressStart === progress) {
      clearInterval(fillValue);
    }

  }, speed, elementValue, progress)
}

export const initFillProgress = () => {
  const indicators = document.querySelectorAll(CLASS_INDICATOR);

  indicators.forEach((indicator) => {
    if (indicator.hasAttribute(ATTRIBUTE_PROGRESS)) {
      const progress = Number(indicator.getAttribute(ATTRIBUTE_PROGRESS));

      if (progress > 0) {
        fillProgressBar(indicator, progress);
        fillProgressValue(indicator, progress);
      }
    }
  });
}
