var planetData;

  fetch('./javascript/data.json').then(response => {
    return response.json();
    }).then(data => {
      planetData = data;
    }).catch(err => {
      console.log('an error has occurred');
    });

  const mainContent = document.getElementById('main-content');
  const tabTrigger = mainContent.querySelector('.tab-buttons');
  const animationProperites = {
         duration: 400,
         easing: 'ease-out',
         fill: 'forwards'
      }
  var elementsToAnimate = mainContent.querySelectorAll("[data-field]");

  tabTrigger.addEventListener('click', (e) => {
    let target = e.target;
    let planetSelected = target.dataset.planet;

    planetData.destinations.forEach((planet) => {

      if (planetSelected === planet.name) {

        setActiveButton(target);

        [...elementsToAnimate].forEach( (element) => {
         let animatedElement =  fadeOut(element)

          animatedElement.onfinish = event => {
            setValue(element, planet);
            fadeIn(element);
          }

        });

      }
    });
  })

  function fadeOut(element) {
    const frames = [
      { opacity: '1' },
      { opacity: '0' }
    ]
   return element.animate(frames, animationProperites);
  }

  function fadeIn(element) {
    const frames = [
      { opacity: '0' },
      { opacity: '1' }
    ]
    element.animate(frames, animationProperites);
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


