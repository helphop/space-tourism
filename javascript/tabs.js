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
  const elementsToAnimate = mainContent.querySelectorAll("[data-field]");
  const animationProperties = {
          duration: 400,
          easing: 'ease-out',
          fill: 'both',
          iterations: 1,
        }


  tabTrigger.addEventListener('keydown', (e) => {

    const leftKey = 37;
    const rightKey = 39;
    const activeButton = tabTrigger.querySelector("[aria-selected='true']");
    let selectedButton;

    if (e.keyCode && e.keyCode === rightKey) {

      const nextButton = activeButton.nextElementSibling;
      const firstButton = tabTrigger.firstElementChild;

      selectedButton = nextButton ? nextButton : firstButton;

    } else if (e.keyCode && e.keyCode === leftKey) {

      const prevButton = activeButton.previousElementSibling;
      const lastButton = tabTrigger.lastElementChild;

      selectedButton = prevButton ? prevButton : lastButton;

    }

    if (selectedButton) updateButtonAttributes(selectedButton, activeButton);

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
            animatedElement.effect.updateTiming({
              direction: 'reverse',
              duration: 1500
            });
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
   return element.animate(frames, animationProperties);
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

  function updateButtonAttributes(selectedButton, prevSelectedButton) {
      setTabIndex(prevSelectedButton, '-1');
      setTabIndex(selectedButton);
      selectedButton.click();
      selectedButton.focus();
  }

 function setTabIndex(element, index=0) { element.setAttribute('tabindex', `${index}`); }


