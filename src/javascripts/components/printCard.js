import print from './helpers/utilities';

const cardPrinter = () => {
  const newName = document.getElementById('inputName').value;
  const newId = document.getElementById('inputId').value;
  const newPic = document.getElementById('inputPic').value;
  let stringDom = '';
  stringDom += `<div id="${newId}" class="card container" style="width: 25rem; height: 27rem">
    <img src="${newPic}" class="card-img-top" alt="location" style="width: 23rem; height: 18rem">
    <div class="card-body">
      <h5 class="card-title">${newName}</h5>
      <small class="form-text">${newId}</small>
      <button id="${newId}-b" type="button" class="btn btn-danger">Attempt at a fish</button>
      <button id="${newId}-c" type="button" class="btn btn-success">Successful catch</button>
    </div>
  </div>`;
  print.printToDom('showInfo', stringDom);
  document.getElementById('inputName').value = '';
  document.getElementById('inputId').value = '';
  document.getElementById('inputPic').value = '';
};

const submitButton = document.getElementById('submit');

const submitFunc = () => {
  submitButton.addEventListener('click', () => {
    cardPrinter();
  });
};

export default { submitFunc };
