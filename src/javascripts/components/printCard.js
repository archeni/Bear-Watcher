import print from './helpers/utilities';
import bear from './bears';

function BearObj(id, name, picture) {
  this.id = id;
  this.name = name;
  this.picture = picture;
  this.attemptTimestamp = [];
  this.successTimestamp = [];
  this.successfulCatch = 0;
}

const cardPrinter = () => {
  let stringDom = '';
  for (let i = 0; i < bear.bears.length; i += 1) {
    stringDom += `<div id="${bear.bears[i].id}" class='card container column'>
    <div>
      <img src="${bear.bears[i].picture}" class="card-img-top" alt="location">
      <div class="card-body">
        <h5 class="card-title">${bear.bears[i].name}</h5>
        <small class="form-text">${bear.bears[i].id}</small>
        <button id="${bear.bears[i].id}-b" type="button" class="btn btn-danger attempt-button">Attempt at a fish</button>
        <button id="${bear.bears[i].id}-c" type="button" class="btn btn-success success-button">Successful catch</button>
        <div class='card-text'><b> Time of attepted catch:</b></div>`;
    for (let k = 0; k < bear.bears[i].attemptTimestamp.length; k += 1) {
      stringDom += `<div>${bear.bears[i].attemptTimestamp}</div>\n`;
    }
    stringDom += "<div class='card-text'><b> Time of successful catch:</b></div>";
    for (let j = 0; j < bear.bears[i].successTimestamp.length; j += 1) {
      stringDom += `<div>${bear.bears[i].successTimestamp}</div>\n`;
    }
    stringDom += `<div class='card-text'><b>Number of successful catches:</b> ${bear.bears[i].successfulCatch}</div>
        </div>
      </div>
    </div>`;
  }
  print.printToDom('showInfo', stringDom);

  document.getElementById('inputName').value = '';
  document.getElementById('inputId').value = '';
  document.getElementById('inputPic').value = '';
};

const submitButton = document.getElementById('submit');

const addBearFunc = () => {
  const newName = document.getElementById('inputName').value;
  const newId = document.getElementById('inputId').value;
  const newPic = document.getElementById('inputPic').value;
  const testBear = new BearObj(newId, newName, newPic);
  bear.bears.push(testBear);
};

const attemptToCatch = (poop) => {
  const timeStamp = new Date();
  for (let i = 0; i < bear.bears.length; i += 1) {
    if (poop === bear.bears[i].id) {
      bear.bears[i].attemptTimestamp.push(timeStamp);
    }
  }
};

const clearFunc = () => {
  print.printToDom('showInfo', '');
};

const successfulCatch = (poop) => {
  const timeStamp = new Date();
  for (let i = 0; i < bear.bears.length; i += 1) {
    if (poop === bear.bears[i].id) {
      bear.bears[i].successfulCatch += 1;
      bear.bears[i].attemptTimestamp.push(timeStamp);
      bear.bears[i].successTimestamp.push(timeStamp);
    }
  }
};

const attachSuccessEvents = () => {
  const successButton = document.getElementsByClassName('success-button');
  for (let i = 0; i < successButton.length; i += 1) {
    successButton[i].addEventListener('click', (event) => {
      const successCounterChange = event.target.parentNode.parentNode.id;
      successfulCatch(successCounterChange);
      const attachattemptedEvents = () => {
        const attemptButton = document.getElementsByClassName('attempt-button');
        for (let j = 0; j < attemptButton.length; j += 1) {
          attemptButton[j].addEventListener('click', (event2) => {
            const attemptCounterChange = event2.target.parentNode.parentNode.id;
            attemptToCatch(attemptCounterChange);
            clearFunc();
            cardPrinter();
            attachattemptedEvents();
            attachSuccessEvents();
          });
        }
      };
      clearFunc();
      cardPrinter();
      attachSuccessEvents();
      attachattemptedEvents();
    });
  }
};

const SomethingEvents = () => {
  const attemptButton = document.getElementsByClassName('attempt-button');
  for (let j = 0; j < attemptButton.length; j += 1) {
    attemptButton[j].addEventListener('click', (event2) => {
      const attemptCounterChange = event2.target.parentNode.parentNode.id;
      attemptToCatch(attemptCounterChange);
      clearFunc();
      cardPrinter();
      SomethingEvents();
      attachSuccessEvents();
    });
  }
};
const submitFunc = () => {
  submitButton.addEventListener('click', () => {
    addBearFunc();
    cardPrinter();
    attachSuccessEvents();
    SomethingEvents();
  });
};
export default { submitFunc };
