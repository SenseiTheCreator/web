// ==============================
// DOM
// ==============================
const tabsContainer = document.querySelector('#tabs');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const topLeft = document.querySelector('#top-left');
const topRight = document.querySelector('#top-right');
const bottomRight = document.querySelector('#bottom-right');
const bottomLeft = document.querySelector('#bottom-left');
const topLeftValue = document.querySelector('#top-left-value');
const topRightValue = document.querySelector('#top-right-value');
const bottomRightValue = document.querySelector('#bottom-right-value');
const bottomLeftValue = document.querySelector('#bottom-left-value');
const preview = document.querySelector('#preview');
const previewButton = document.querySelector('#preview-button');
const coordinates = document.querySelector('#coordinates');
const cssCode = document.querySelector('#css-code');
const copyButton = document.querySelector('#copy-button');
const copyMessage = document.querySelector('#copy-message');
const presetForm = document.querySelector('#preset-form');
const presetName = document.querySelector('#preset-name');
const presetError = document.querySelector('#preset-error');
const scrollTopButton = document.querySelector('#scroll-top');
const gap = document.querySelector('#gap');
const gapValue = document.querySelector('#gap-value');
const flexDirection = document.querySelector('#flex-direction');

// ==============================
// TABS
// ==============================
function hideTabs() {
  tabs.forEach(function (tab) {
    tab.classList.remove('active');
  });

  tabContents.forEach(function (content) {
    content.classList.remove('active');
  });
}

function showTab(tabName) {
  const tab = document.querySelector(`[data-tab="${tabName}"]`);
  const content = document.querySelector(`[data-content="${tabName}"]`);

  tab.classList.add('active');
  content.classList.add('active');
}

// ==============================
// CSS CODE
// ==============================
function updateCSSCode() {
  const radius = `${topLeft.value}px ${topRight.value}px ${bottomRight.value}px ${bottomLeft.value}px`;

  cssCode.value = [
    `border-radius: ${radius};`,
    `gap: ${gap.value}px;`,
    `flex-direction: ${flexDirection.value};`
  ].join('\n');
}

// ==============================
// BORDER RADIUS
// ==============================
function generateBorderRadius() {
  const topLeftRadius = topLeft.value;
  const topRightRadius = topRight.value;
  const bottomRightRadius = bottomRight.value;
  const bottomLeftRadius = bottomLeft.value;

  const radius = `${topLeftRadius}px ${topRightRadius}px ${bottomRightRadius}px ${bottomLeftRadius}px`;

  preview.style.borderRadius = radius;

  topLeftValue.textContent = `${topLeftRadius} px`;
  topRightValue.textContent = `${topRightRadius} px`;
  bottomRightValue.textContent = `${bottomRightRadius} px`;
  bottomLeftValue.textContent = `${bottomLeftRadius} px`;

  updateCSSCode();
}

// ==============================
// GAP & FLEX DIRECTION (variant 15)
// ==============================
function generateGap() {
  preview.style.gap = `${gap.value}px`;
  gapValue.textContent = `${gap.value} px`;

  updateCSSCode();
}

function changeFlexDirection() {
  preview.style.flexDirection = flexDirection.value;

  updateCSSCode();
}

// ==============================
// COPY
// ==============================
function copyCSS() {
  navigator.clipboard.writeText(cssCode.value).then(function () {
    copyMessage.textContent = 'CSS-код скопійовано';
  }).catch(function () {
    copyMessage.textContent = 'Не вдалося скопіювати';
  });
}

// ==============================
// FORM
// ==============================
function validatePresetName() {
  if (presetName.value.trim() === '') {
    presetName.classList.add('error');
    presetError.textContent = 'Введіть назву пресета';
    return false;
  }

  presetName.classList.remove('error');
  presetError.textContent = '';
  return true;
}

function handlePresetSubmit(event) {
  event.preventDefault();

  if (!validatePresetName()) {
    return;
  }

  console.log(`Пресет: ${presetName.value.trim()}`);
  console.log(cssCode.value);
}

// ==============================
// KEYBOARD
// ==============================
function handleKeyDown(event) {
  if (event.key !== 'Escape') {
    return;
  }

  topLeft.value = 0;
  topRight.value = 0;
  bottomRight.value = 0;
  bottomLeft.value = 0;

  generateBorderRadius();
}

// ==============================
// SCROLL
// ==============================
function handleScroll() {
  if (window.scrollY > 300) {
    scrollTopButton.classList.add('visible');
  } else {
    scrollTopButton.classList.remove('visible');
  }
}

// ==============================
// EVENTS
// ==============================
tabsContainer.addEventListener('click', function (event) {
  const tab = event.target.closest('.tab');

  if (!tab) {
    return;
  }

  console.log(event.type);
  console.log(event.target);
  console.log(event.currentTarget);

  hideTabs();
  showTab(tab.dataset.tab);
});

topLeft.addEventListener('input', generateBorderRadius);
topRight.addEventListener('input', generateBorderRadius);
bottomRight.addEventListener('input', generateBorderRadius);
bottomLeft.addEventListener('input', generateBorderRadius);

gap.addEventListener('input', generateGap);
flexDirection.addEventListener('change', changeFlexDirection);

presetName.addEventListener('focus', function () {
  presetName.classList.add('focused');
});

presetName.addEventListener('blur', function () {
  presetName.classList.remove('focused');
  validatePresetName();
});

presetForm.addEventListener('submit', handlePresetSubmit);

copyButton.addEventListener('click', copyCSS);

document.addEventListener('keydown', handleKeyDown);

preview.addEventListener('click', function () {
  console.log('Preview click');
});

previewButton.addEventListener('click', function (event) {
  event.stopPropagation();
  console.log('Button click');
});

preview.addEventListener('mouseover', function () {
  preview.classList.add('hovered');
});

preview.addEventListener('mouseout', function () {
  preview.classList.remove('hovered');
});

preview.addEventListener('mousemove', function (event) {
  coordinates.textContent = `X: ${event.clientX}; Y: ${event.clientY}`;
  console.log(event.pageX, event.pageY);
});

window.addEventListener('scroll', handleScroll);

scrollTopButton.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

generateBorderRadius();
generateGap();
changeFlexDirection();