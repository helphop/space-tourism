
var planetData;

fetch('./javascript/data.json').then(response => {
  return response.json();
}).then(data => {
  // Work with JSON data here
  // console.log(data);
  planetData = data;
  // console.log(tabTrigger);
  // console.log(planetTitle);


}).catch(err => {
  // Do something for an error here
});

  const mainContent = document.getElementById('main-content');
  const planetImage = mainContent.querySelector('.planet-image');
  const planetName = mainContent.querySelector('.planet-title');
  const planetDescription = mainContent.querySelector('.planet-description');
  const destinationMeta = mainContent.querySelector('.destination-meta');
  const distance =  destinationMeta.firstElementChild.lastElementChild;
  const travel = destinationMeta.lastElementChild.lastElementChild;
  const tabTrigger = mainContent.querySelector('.tab-buttons');
  const duration = 800;

  tabTrigger.addEventListener('click', (e) => {
    let target = e.target;
    let planetSelected = target.dataset.planet;

    planetData.destinations.forEach((planet) => {

     if (planetSelected === planet.name) {
       fadeOut(mainContent);
       setTimeout(() => {
        setActiveButton(target);
        setText(planet.name, planetName);
        setText(planet.description, planetDescription);
        setText(planet.distance, distance);
        setText(planet.travel, travel )
        setImages(planet);
        fadeIn(mainContent);
        }, duration)

     }

    })
  })

  function fadeOut(element) {
    const frames = [
      { opacity: '100%' },
      { opacity: '0%' }
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
      { opacity: '0%' },
      { opacity: '100%' }
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
    activeButton.ariaSelected = 'false';
    element.ariaSelected = 'true';
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

