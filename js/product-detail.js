// Add this to your existing product-detail.js file

function initSectionNav() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Update active state
      navLinks.forEach(l => l.classList.remove('text-black'));
      link.classList.add('text-black');
    });
  });
  
  // Highlight current section on scroll
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const link = document.querySelector(`a[href="#${section.id}"]`);
      
      if (rect.top <= 100 && rect.bottom >= 100) {
        navLinks.forEach(l => l.classList.remove('text-black'));
        link?.classList.add('text-black');
      }
    });
  });
}

// Add this to your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
  initColorPlate();
  initSectionNav();
});

// Initialize color plate functionality
function initColorPlate() {
  const mainSwiper = new Swiper('.tf-product-media-main', {
    spaceBetween: 10,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  // Get unique colors from available images
  const slides = document.querySelectorAll('.swiper-slide[data-color]');
  const uniqueColors = [...new Set([...slides].map(slide => slide.dataset.color))];

  // Create color buttons container
  const colorContainer = document.querySelector('.variant-picker-values');
  colorContainer.innerHTML = '';

  // Generate color buttons
  uniqueColors.forEach((color, index) => {
    const colorBtn = `
      <input id="values-${color}" type="radio" name="color1" ${index === 0 ? 'checked' : ''} />
      <label
        class="hover-tooltip tooltip-bot radius-60 color-btn"
        for="values-${color}"
        data-color="${color}"
      >
        <span class="btn-checkbox bg-color-${color}"></span>
        <span class="tooltip">${color.charAt(0).toUpperCase() + color.slice(1)}</span>
      </label>
    `;
    colorContainer.insertAdjacentHTML('beforeend', colorBtn);
  });

  // Handle color selection
  document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const selectedColor = this.dataset.color;
      
      // Update color label
      const colorLabel = document.querySelector('.value-currentColor');
      colorLabel.textContent = selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1);

      // Find first slide with selected color
      const targetSlideIndex = [...mainSwiper.slides].findIndex(
        slide => slide.dataset.color === selectedColor
      );

      // Switch to corresponding slide
      mainSwiper.slideTo(targetSlideIndex);
    });
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initColorPlate);
  