'use strict';

let Helpers = function() {

  this.getVisibleInputElement = (containerElement) => {
    return containerElement.$$('input').filter((elem, index) => {
      return elem.isDisplayed().then((isDisplayed) => {
        return isDisplayed;
      });
    }).get(0);
  };

};

module.exports = new Helpers();
