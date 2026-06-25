document.addEventListener('DOMContentLoaded', () => {
  initFaqAccordion();
});

/* FAQS Accordion smooth drop height mechanics */
function initFaqAccordion() {
  const headers = document.querySelectorAll('.faq-header');
  
  headers.forEach(header => {
    header.addEventListener('click', function() {
      const card = this.closest('.faq-card');
      const content = card.querySelector('.faq-content');
      const isActive = card.classList.contains('active');
      
      // 1. Collapse all other accordion cards
      document.querySelectorAll('.faq-card').forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.classList.remove('active');
          otherCard.querySelector('.faq-content').style.maxHeight = null;
        }
      });
      
      // 2. Toggle active status of this card
      if (!isActive) {
        card.classList.add('active');
        // Animate height strictly to its internal scroll content height
        content.style.maxHeight = `${content.scrollHeight}px`;
      } else {
        card.classList.remove('active');
        content.style.maxHeight = null;
      }
    });
  });
}