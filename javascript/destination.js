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
  var elementsToAnimate = mainContent.querySelectorAll(":not(h1):not(h1 > span):not(.tab-buttons):not(.tab-buttons > *)");

  tabTrigger.addEventListener('click', (e) => {
    let target = e.target;
    let planetSelected = target.dataset.planet;

    planetData.destinations.forEach((planet) => {

      if (planetSelected === planet.name) {

        [...elementsToAnimate].forEach( element => fadeOut(element));

         setActiveButton(target);

        //must wait for animation to end
        setTimeout(() => {

          setText(planet.name, planetName);
          setText(planet.description, planetDescription);
          setText(planet.distance, distance);
          setText(planet.travel, travel );
          setImages(planet);

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

  function setText(text, element) {
    element.textContent = text;
  }

  function setImages(data) {
    const source = planetImage.querySelector("source");
    const img = planetImage.querySelector("img");
    source.srcset = data.images.webp;
    img.src = data.images.png;
  }

