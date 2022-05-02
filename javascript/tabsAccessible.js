(function() {

  const tabList = document.querySelector('[role="tablist"]');
  const tabs = tabList.querySelectorAll('[role="tab"]');
  const keydownLeft = 37;
  const keydownRight = 39;
  const spaceBar = 32;
  let tabFocus = 0;

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

  tabList.addEventListener('keyup', (e) => {

    if (e.keyCode === spaceBar) {
       tabs[tabFocus].click();
    }

  })

}());