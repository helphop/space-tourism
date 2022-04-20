    // Blur Page Content if no backdrop-filter support
    if (!CSS.supports("backdrop-filter: blur(12px")) {
      const menuList = document.querySelector('.primary-navigation-list');
      blurContent(menuList);
    }
    //makes a copy of the page contents to be used to imitate
    //the backdrop-filter for unsupported browsers
    function blurContent(element) {
      const blurTarget = document.querySelector('body');
      //make copy of page content
      const duplicate = blurTarget.cloneNode(true);
      //remove the navigation node so we don't include it in the copy
      duplicate.querySelector('nav').remove();
      //assign tabindex -1 to tabbable elements so not tabbable
      makeUntabbable(duplicate);
      //set aria-hidden='true' so not readable by screen readers
      duplicate.setAttribute('aria-hidden', true);
      //create div to hold the blurred content
      targetBlurred = document.createElement('div');
      //Assign class blurred-content to target it
      targetBlurred.className = 'blurred-content';
      //add copied content to div
      targetBlurred.appendChild(duplicate);
      //place blurred content onto page
      element.parentNode.insertBefore(targetBlurred, element);
      // element.append(targetBlurred);
    }

    //adds tabindex = -1 to certain elements so they won't be tabbed into
    function makeUntabbable(htmlNode) {
      let tabbable = ['a', 'input', 'select', 'button', 'textarea'];
      tabbable.forEach(tabbable => {
        elems = htmlNode.getElementsByTagName(tabbable);
        [...elems].forEach(elem => elem.setAttribute('tabindex', -1));
      });
    }