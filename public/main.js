const nameField = document.querySelector('#name-field');
const priceField = document.querySelector('#price-field');
const removeField = document.querySelector('#remove-field');
const addBtn = document.querySelector('.add-btn');
const removeBtn = document.querySelector('.remove-btn');
const addMsg = document.querySelector('.add-msg');
const removeMsg = document.querySelector('.remove-msg');
const datalist = document.querySelector('#current-items');
const itemNames = document.querySelectorAll('.item-name');

const fillDefaultDataList = function() {
 
    itemNames.forEach((itemName)=> {
        const option = document.createElement('option');
        option.appendChild(document.createTextNode(itemName.textContent));
        datalist.appendChild(option);
    });
}();

const addToDataList = function(span_name) {
    const option = document.createElement('option');
    option.appendChild(document.createTextNode(span_name.textContent));
    datalist.appendChild(option);
}

const removeFromDataList = function(itemName) {
    const options = document.querySelectorAll('datalist > *');
    const toRemove = Array.from(options).find((option)=> option.textContent === itemName.textContent); 
    toRemove.remove();
}

const addValidate = function(e) {
    if(Array.from(nameField.value).length === 0 ||
       Array.from(priceField.value).length === 0 ) {
           addMsg.style.display = 'block';
       }
    else {
        const list = document.querySelector('.list');
        const li = document.createElement('li');
        const span_name = document.createElement('span')
        const span_price = document.createElement('span')
        span_name.appendChild(document.createTextNode(nameField.value));
        span_price.appendChild(document.createTextNode(`RS ${priceField.value}`));
        span_name.classList.add('item-name');
        span_price.classList.add('item-price');
        li.appendChild(span_name);
        li.appendChild(span_price);
        li.classList.add('list-item');
        list.appendChild(li);
        addToDataList(span_name);
    }
}

const removeValidate = function(e) {
    if(Array.from(removeField.value).length === 0) {
           removeMsg.style.display = 'block';
       } 
    else {
        const itemNames = document.querySelectorAll('.item-name');
        const itemName = Array.from(itemNames).find((itemName)=> itemName.textContent === removeField.value);
        removeFromDataList(itemName);
        itemName.parentElement.remove();
    }
} 

addBtn.addEventListener('click', addValidate);
removeBtn.addEventListener('click', removeValidate);
nameField.addEventListener('focus', () => addMsg.style.display = 'none');
priceField.addEventListener('focus', () => addMsg.style.display = 'none');
removeField.addEventListener('focus', () => removeMsg.style.display = 'none');




