var planetData;

fetch('./javascript/data.json').then(response => {
  return response.json();
}).then(data => {
  planetData = data;
}).catch(err => {
  console.log('an error has occured');
});

  const mainContent = document.getElementById('main-content');
  const planetImage = mainContent.querySelector('.planet-image');
  const planetName = mainContent.querySelector('.planet-title');
  const planetDescription = mainContent.querySelector('.planet-description');
  const destinationMeta = mainContent.querySelector('.destination-meta');
  const distance =  destinationMeta.firstElementChild.lastElementChild;
  const travel = destinationMeta.lastElementChild.lastElementChild;
  const tabTrigger = mainContent.querySelector('.tab-buttons');
  const duration = 400;
  var elementsToAnimate = mainContent.querySelectorAll("[data-field]");
  console.log(planetImage.tagName);


  tabTrigger.addEventListener('click', (e) => {
    let target = e.target;
    let planetSelected = target.dataset.planet;

    planetData.destinations.forEach((planet) => {

      if (planetSelected === planet.name) {
        [...elementsToAnimate].forEach( element => fadeOut(element));
         setActiveButton(target);

        //must wait for animation to end
        setTimeout(() => {
         [...elementsToAnimate].forEach(element => setValue(element, planet));
         [...elementsToAnimate].forEach(element => fadeIn(element));
          }, duration)
      }

    });
  })

  function fadeOut(element) {
    const frames = [
      { opacity: '1' },
      { opacity: '0' }
    ]

    element.animate(
      frames,
      {
         duration: duration,
         easing: 'ease-out',
         fill: 'forwards'
      }
    )
  }

  function fadeIn(element) {
    const frames = [
      { opacity: '0' },
      { opacity: '1' }
    ]

    element.animate(
      frames,
      {
         duration: duration,
         easing: 'ease-in',
         fill: 'forwards'
      }
    )
  }

  function setActiveButton(element) {
    activeButton = mainContent.querySelector("[aria-selected='true']");
    activeButton.setAttribute('aria-selected', 'false');
    element.setAttribute('aria-selected', 'true');
  }

  function setValue(element, data) {
      if (element.tagName === 'SOURCE') {
        element.srcset = data['images'][element.dataset.field]
      } else if (element.tagName === 'IMG') {
        element.src = data['images'][element.dataset.field]
      } else {
        element.textContent = data[element.dataset.field];
      }
  }


