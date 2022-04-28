 (function() {
 //used to store the date
  var siteData;

  //load the site data
  fetch('./javascript/data.json').then(response => {
    return response.json();
    }).then(data => {
      siteData = data;
    }).catch(err => {
      console.log('an error has occurred');
  });

  const tabList = document.querySelector('[role="tablist"]');
  const tabs = tabList.querySelectorAll('[role="tab"]');
  const elementsToUpdate =document.querySelectorAll("[data-field]");
  const animationProperties = {
          duration: 400,
          easing: 'ease-out',
          fill: 'both',
          iterations: 1
        }
  const keydownLeft = 37;
  const keydownRight = 39;
  const spaceBar = 32;
  let tabFocus = 0;

  tabList.addEventListener('click', (e) => {
    //get the button that was clicked
    let target = e.target;
    //get the section of the JSON data to use
    let dataSection = tabList.dataset.section;
    //get the selected value from the clicked button
    let dataSelected = target.dataset.selected;
    //find the record in the JSON data
    let datum = siteData[`${dataSection}`].find(record => record.name === `${dataSelected}`);

    //Update the field details
    [...elementsToUpdate].forEach(element => {

      animatedTab =  fadeOut(element)

      animatedTab.onfinish = event => {
        updateField(element, datum);
        fadeIn(element);
      }

    });

    //Update the area-selected and tabindex on the buttons
    const currentButton = document.querySelector('button[role="tab"][aria-selected="true"]');
    updateButtonAttributes(currentButton, -1, 'false');
    updateButtonAttributes(target);

    //Update the TabFocus value so in sync with the clicked element
    updateTabFocus(target);

  });

  tabList.addEventListener('keydown', (e) => {

      if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
          tabs[tabFocus].setAttribute("tabindex", -1);

      if (e.keyCode === keydownRight) {
          if (tabFocus < tabs.length-1) {
            tabFocus++;
          } else {
            tabFocus = 0;
          }
      }

      if (e.keyCode === keydownLeft) {
        if (tabFocus > 0) {
          tabFocus--;
        } else {
          tabFocus = tabs.length - 1;
        }
      }

      tabs[tabFocus].setAttribute("tabindex", 0);
      tabs[tabFocus].focus();

    }
  })

  //Use keyup for spacebar so don't get double click
  tabList.addEventListener('keyup', (e) => {
    if (e.keyCode === spaceBar) tabs[tabFocus].click();
  })

  function fadeOut(element) {
    const frames = [
      { opacity: '1' },
      { opacity: '0' }
    ]
   return element.animate(frames, animationProperties);
  }

  function fadeIn(element) {
    const frames = [
      { opacity: '0' },
      { opacity: '1' }
    ]
   return element.animate(frames, animationProperties);
  }

  function updateButtonAttributes(button, tabIndex=0, ariaSelected='true') {
    button.setAttribute('aria-selected', `${ariaSelected}`);
    button.setAttribute('tabindex', `${tabIndex}`)
  }

  function updateField(element, data) {
      if (element.tagName === 'SOURCE') {
        element.srcset = data['images'][element.dataset.field]
      } else if (element.tagName === 'IMG') {
        element.src = data['images'][element.dataset.field]
      } else {
        element.textContent = data[element.dataset.field];
      }
  }

  function updateTabFocus(target) { tabFocus = [...tabs].indexOf(target); }

}());