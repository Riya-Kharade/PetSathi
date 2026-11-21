(() => {
  const form = document.querySelector('.walker-filters');
  if (!form) return;
  const search = document.getElementById('walker-search');
  const pet = document.getElementById('walker-pet');
  const cards = [...document.querySelectorAll('.walker-card')];
  function filter() {
    const query = search.value.trim().toLocaleLowerCase();
    let count = 0;
    for (const card of cards) {
      const matches = (pet.value === 'all' || card.dataset.pet === pet.value)
        && card.textContent.toLocaleLowerCase().includes(query);
      card.hidden = !matches;
      if (matches) count++;
    }
    document.getElementById('walker-result-count').textContent = `${count} caregiver ${count === 1 ? 'category' : 'categories'}`;
    document.getElementById('walker-empty').hidden = count !== 0;
  }
  search.addEventListener('input', filter);
  pet.addEventListener('change', filter);
  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('reset', () => {
    // Apply defaults explicitly before filtering; native reset runs after its event listeners.
    search.value = ''; pet.value = 'all'; filter();
  });
  filter();
})();
