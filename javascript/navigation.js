(function() {
  let menuTrigger = document.getElementById('menu-trigger');

  if (menuTrigger) {
    const menuList = document.getElementById('primary-navigation-list');
    const navigation = document.querySelector('nav');
    const firstFocusableEl = menuList.firstElementChild.firstElementChild;
    const lastFocusableEl = menuList.lastElementChild.firstElementChild;
    //put focus on menu Trigger when page loads
    menuTrigger.focus();

    //Add event listener for mouse click events or mobile tap events
    menuTrigger.addEventListener('click', function(event) {
      //space bar key and enter key also trigger 'click' event
      //so we want to make sure we only react to mouse clicks
      if (mouseClick(event)) toggleMenu(this);
      //turn on the toggle trap when menu opens
      //and turn off when menu closes
      toggleTrapFocus(menuTrigger);
    });

    //Close menu if use clicks anywhere off the menu
    document.addEventListener('click', function(event) {
      if ( !isNavigationElement(event) && menuTrigger && menuTrigger.getAttribute('aria-expanded') === 'true') {
          toggleMenu(menuTrigger);
        }
    });

    //Add event listener for key stroke to make menu accessible
  	document.addEventListener('keydown', function(event) {
      //if the enter or space key has been pressed
      //and menu button has focus && the menu is closed
      //open menu
			if (keyOpen(event) && hasFocus(menuTrigger) && !isExpanded(menuTrigger)) {
        openMenu(menuTrigger);
        toggleTrapFocus(menuTrigger);
      //if escape key has been pressed and the menu is open
      //close menu
			} else if (isExpanded(menuTrigger) && keyClose(event)) {
        closeMenu(menuTrigger);
        //turn off toggle trap focus
        toggleTrapFocus(menuTrigger);
        //put focus back to menu trigger
        menuTrigger.focus();
        //if menu open and the shift and tab key are pressed
        //if on the first list element move to the last list element
        //if menu open and tab key is pressed
        //when on the last list element move to first list element
        //to create a loop
      } else if (isExpanded(menuTrigger) &&  keyTab(event)) {

        if (keyShift(event)) {
          moveToLastEl(event);
        } else {
          moveToFirstEl(event);
        }
      }
		});

    function isNavigationElement(event) {
      return event.target.parentElement === navigation || event.target.parentElement.parentElement === navigation;
    }

    function moveToLastEl(event) {
      if (hasFocus(firstFocusableEl)) {
          lastFocusableEl.focus();
          event.preventDefault();
      }
    }

    function moveToFirstEl(event) {
      if (hasFocus(lastFocusableEl)) {
          firstFocusableEl.focus();
          event.preventDefault();
      }
    }

    function toggleMenu(elem) {
      let expanded = elem.getAttribute('aria-expanded') === 'true';
      // if expanded true we need to set it to false
      // if expanded false we need to set it to true
      elem.setAttribute('aria-expanded', !expanded);
    }


    //determines if event was fired by a mouse click
    function mouseClick(event) {
      return event.detail === 1;
    }

    function openMenu(elem) {
      elem.setAttribute('aria-expanded', true);
    }

    function closeMenu(elem) {
      elem.setAttribute('aria-expanded', false);
    }

    function hasFocus(elem) {
      return elem === document.activeElement;
    }

    function isExpanded(elem) {
      return elem.getAttribute('aria-expanded') === 'true';
    }

    function keyOpen(event) {
     return ((event.keyCode && event.keyCode === 13) ||
              (event.key && event.key.toLowerCase() === 'enter' ) ||
              (event.keyCode && event.keyCode === 32) ||
              (event.key && event.key.toLowerCase() === 'space' ));
    }

    function keyClose(event) {
      return ((event.keyCode && event.keyCode === 27) ||
              (event.key && event.key.toLowerCase() === 'escape' ));
    }

    function keyShift(event) {
      return ((event.shiftKey  || event.key.toLowerCase() === 'shift'));
    }

    function keyTab(event) {
      return ((event.keyCode && event.keyCode === 9) ||
              (event.key && event.key.toLowerCase() === 'tab'));
    }

    function isDescendantOf(parent, element) {
      return parent.contains(element)
    }

    function moveFocusToMenu() {
      menuList.firstElementChild.firstElementChild.focus();
    }

    function trapFocus() {
      document.addEventListener('focusin', evt => {
        if (!isDescendantOf(navigation, evt.target)) moveFocusToMenu()
      });
    }

    function unTrapFocus() {
      document.removeEventListener('focusin', function(){});
    }

    function toggleTrapFocus(element) {
      isExpanded(element) ? trapFocus() : unTrapFocus();
    }

  }

}());



