document.querySelectorAll('.navlink').forEach(item => {
    item.addEventListener('click', event => {
      document.querySelector('.navlink.bg-gray-200').classList.remove('bg-gray-200');
      item.classList.add('bg-gray-200');
    })
  })