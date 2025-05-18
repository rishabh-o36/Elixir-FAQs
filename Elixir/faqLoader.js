const buttons = document.querySelectorAll('button[data-category]');
const faqContainer = document.getElementById('faq-container');

buttons.forEach(button => {
  button.addEventListener('click', async () => {
    const category = button.getAttribute('data-category');
    try {
      const module = await import(`./modules/${category}.js`);
      renderFAQs(module.faqs);
    } catch (error) {
      faqContainer.innerHTML = `<p>Error loading FAQs for "${category}".</p>`;
      console.error(`Error loading module ${category}:`, error);
    }
  });
});

// Default load (general FAQs)
import('./modules/general.js').then(module => renderFAQs(module.faqs));

function renderFAQs(faqs) {
  faqContainer.innerHTML = '';
  faqs.forEach(({ question, answer }) => {
    const faqItem = document.createElement('div');
    faqItem.classList.add('faq-item');

    const faqQuestion = document.createElement('div');
    faqQuestion.classList.add('faq-question');
    faqQuestion.innerHTML = `${question} <span class="symbol">+</span>`;

    const faqAnswer = document.createElement('div');
    faqAnswer.classList.add('faq-answer');
    faqAnswer.textContent = answer;

    faqQuestion.addEventListener('click', () => {
      const symbol = faqQuestion.querySelector('.symbol');
      const isOpen = faqAnswer.classList.contains('open');
      // Close all open answers
      document.querySelectorAll('.faq-answer').forEach(ans => ans.classList.remove('open'));
      document.querySelectorAll('.symbol').forEach(sym => sym.classList.remove('rotate'));

      if (!isOpen) {
        faqAnswer.classList.add('open');
        symbol.classList.add('rotate');
      }
    });

    faqItem.appendChild(faqQuestion);
    faqItem.appendChild(faqAnswer);
    faqContainer.appendChild(faqItem);
  });
}
