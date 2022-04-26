var siteData;

  fetch('./javascript/data.json').then(response => {
    return response.json();
    }).then(data => {
      siteData = data;
    }).catch(err => {
      console.log('an error has occurred');
    });

  const mainContent = document.getElementById('main-content');
  const tabTrigger = mainContent.querySelector("[data-trigger]");
  const animationProperites = {
         duration: 400,
         easing: 'ease-out',
         fill: 'forwards'
      }
  var elementsToAnimate = mainContent.querySelectorAll("[data-field]");

    tabTrigger.addEventListener('keydown', (e) => {
      const leftKey = 37;
      const rightKey = 39;
      const activeButton = tabTrigger.querySelector("[aria-selected='true']");
      console.log(activeButton);
      if (e.keyCode && e.keyCode === rightKey) {

        const nextButton = activeButton.nextElementSibling;
        const firstButton = tabTrigger.firstElementChild;

        if (nextButton) {
          nextButton.click()
          setFocus(nextButton);
        } else  {
          firstButton.click();
          setFocus(firstButton);
        }

      } else if (e.keyCode && e.keyCode === leftKey) {

        const prevButton = activeButton.previousElementSibling;
        const lastButton = tabTrigger.lastElementChild;

        if(prevButton) {
          prevButton.click();
          setFocus(prevButton);
        } else {
          lastButton.click();
          setFocus(lastButton);
        }
      }
    });



  tabTrigger.addEventListener('click', (e) => {
    let target = e.target;
    let dataSection = tabTrigger.dataset.trigger;
    let dataSelected = target.dataset.selected;

    siteData[dataSection].forEach((datum) => {

      if (dataSelected === datum.name) {

        setActiveButton(target);

        [...elementsToAnimate].forEach( (element) => {
         let animatedElement =  fadeOut(element)

          animatedElement.onfinish = event => {
            setValue(element, datum);
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

 function setFocus(element) {element.focus();}


