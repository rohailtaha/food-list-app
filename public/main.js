const itemNames = document.querySelectorAll('.item-name');

const nameField = () => document.querySelector('#name-field');
const priceField = () => document.querySelector('#price-field');
const removeField = () => document.querySelector('#remove-field');

const addItemToDataList = function (element) {
  const option = document.createElement('option');
  option.appendChild(document.createTextNode(element.textContent));
  document.querySelector('#current-items').appendChild(option);
};

const removeItemFromDataList = itemName =>
  Array.from(document.querySelectorAll('datalist > *'))
    .find(option => option.textContent === itemName)
    .remove();

const handleAdd = () => {
  if (
    nameField().value === '' ||
    priceField().value <= 0 ||
    priceField().value > 100000000
  ) {
    addMsg.style.display = 'block';
  } else {
    saveItem(nameField().value, priceField().value);
    renderItem(nameField().value, priceField().value);
    nameField().value = '';
    priceField().value = '';
  }
};

const saveItem = (name, price) => {
  const items = savedItems();
  items.push({ name, price });
  localStorage.setItem('items', JSON.stringify(items));
};

const renderItem = (name, price) => {
  const list = document.querySelector('.list');
  const li = document.createElement('li');
  const span_name = document.createElement('span');
  const span_price = document.createElement('span');
  span_name.appendChild(document.createTextNode(name));
  span_price.appendChild(document.createTextNode(`RS ${price}`));
  span_name.classList.add('item-name');
  span_price.classList.add('item-price');
  li.appendChild(span_name);
  li.appendChild(span_price);
  li.classList.add('list-item');
  list.prepend(li);
  addItemToDataList(span_name);
};

const savedItems = () => JSON.parse(localStorage.getItem('items')) || [];

const loadSavedItems = () => {
  savedItems().forEach(item => renderItem(item.name, item.price));
};
loadSavedItems();

const handleRemove = () => {
  if (removeField().value === '') {
    removeMsg.style.display = 'block';
  } else {
    const itemNameElement = Array.from(
      document.querySelectorAll('.item-name')
    ).find(itemName => itemName.textContent === removeField().value);
    if (itemNameElement) {
      removeSavedItem(itemNameElement.textContent);
      removeItemFromDataList(itemNameElement.textContent);
      itemNameElement.parentElement.remove();
      removeField().value = '';
    }
  }
};

const removeSavedItem = itemName => {
  const items = savedItems().filter(item => item.name != itemName);
  localStorage.setItem('items', JSON.stringify(items));
};

document.querySelector('.add-btn').addEventListener('click', handleAdd);

document.querySelector('.remove-btn').addEventListener('click', handleRemove);

const addMsg = document.querySelector('.add-msg');
const removeMsg = document.querySelector('.remove-msg');

document
  .querySelector('#name-field')
  .addEventListener('focus', () => (addMsg.style.display = 'none'));

document
  .querySelector('#price-field')
  .addEventListener('focus', () => (addMsg.style.display = 'none'));

document
  .querySelector('#remove-field')
  .addEventListener('focus', () => (removeMsg.style.display = 'none'));
