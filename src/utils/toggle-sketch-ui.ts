export const toggleSketchUI = () => {
  const elems = [
    document.getElementById('sketch-summary'),
    document.getElementById('back-home'),
    document.getElementById('social-links'),
  ];

  const toggle = () => {
    elems.forEach((elem) => {
      if (elem) {
        elem.classList.toggle('hidden');
      }
    });
  };

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggle();
    }
  });
};
