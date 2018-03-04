const StorageCtrl = (function() {
  return {
    storeItem: storeItem,
    getItems: getItems,
    updateItem: updateItem,
    deleteItem: deleteItem,
    deleteAllItems: deleteAllItems
  };

  function storeItem(newItem) {
    let items;

    if(localStorage.getItem('items') === null) {
      items = [];
      items.push(newItem);
      localStorage.setItem('items', JSON.stringify(items));
    }
    else {
      items = JSON.parse(localStorage.getItem('items'));
      items.push(newItem);
      localStorage.setItem('items', JSON.stringify(items));
    }
  }

  function getItems() {
    let items;

    if(localStorage.getItem('items') === null) {
      items = [];
    }
    else {
      items = JSON.parse(localStorage.getItem('items'));
    }

    return items;
  };

  function updateItem(updatedItem) {
    let items = JSON.parse(localStorage.getItem('items'));

    items.forEach(function(item, index) {
      if(updatedItem.id === item.id) {
        items.splice(index, 1, updatedItem);
      }
    });

    localStorage.setItem('items', JSON.stringify(items));
  }

  function deleteItem(id) {
    let items = JSON.parse(localStorage.getItem('items'));

    items.forEach(function(item, index) {
      if(id === item.id) {
        items.splice(index, 1);
      }
    });

    localStorage.setItem('items', JSON.stringify(items));
  }

  function deleteAllItems() {
    localStorage.removeItem('items');
  }
})();

const ItemCtrl = (function() {
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  const data = {
    items: StorageCtrl.getItems(),
    currentItem: null,
    totalCalories: 0
  };

  return {
    getItems: getItems,
    getTotalCalories: getTotalCalories,
    addItem: addItem,
    updateItem: updateItem,
    deleteItem: deleteItem,
    deleteAllItems: deleteAllItems,
    getItemById: getItemById,
    setCurrentItem: setCurrentItem,
    getCurrentItem: getCurrentItem,
    logData: logData
  };

  function getItems() {
    return data.items;
  }
  
  function getTotalCalories() {
    let totalCalories = 0;

    data.items.forEach(function(item) {
      totalCalories += item.calories;
    });

    data.totalCalories = totalCalories;

    return data.totalCalories;
  }

  function addItem(name, calories) {
    let id;

    id = (data.items.length > 0) ?
      id = data.items[data.items.length - 1].id + 1 :
      id = 0;

    calories = parseInt(calories);

    newItem = new Item(id, name, calories);
    data.items.push(newItem);

    return newItem;
  }

  function updateItem(name, calories) {
    let foundItem = null;

    calories = parseInt(calories);

    data.items.forEach(function(item) {
      if(item.id === data.currentItem.id) {
        item.name = name;
        item.calories = calories;
        foundItem = item;
      }
    });

    return foundItem;
  }

  function deleteItem(itemId) {
    const itemIds = data.items.map(function(item) {
      return item.id;
    });

    const index = itemIds.indexOf(itemId);

    data.items.splice(index, 1);
    data.currentItem = null;
  }

  function deleteAllItems() {
    data.items = [];
    data.currentItem = null;    
  }

  function getItemById(itemId) {
    let foundItem = null;

    data.items.forEach(function(item) {
      if(item.id === itemId) {
        foundItem = item;
      }
    });

    return foundItem;
  }
  
  function setCurrentItem(item) {
    data.currentItem = item;
  }
  
  function getCurrentItem() {
    return data.currentItem;
  }

  function logData() {
    return data;
  }
})();

const UICtrl = (function() {
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    totalCalories: '.total-calories'
  };
  
  return {
    populateItemList: populateItemList,
    getItemInputVals: getItemInputVals,
    hideList: hideList,
    addListItem: addListItem,
    updateListItem: updateListItem,
    removeListItem: removeListItem,
    removeAllListItems: removeAllListItems,
    showTotalCalories: showTotalCalories,
    clearInputs: clearInputs,
    addItemToForm: addItemToForm,
    setInitialState: setInitialState,
    setEditState: setEditState,
    getSelectors: getSelectors
  };


  function populateItemList(items) {
    let html = '';

    items.forEach(function(item) {
      html += `
        <li id="item-${item.id}" class="collection-item">
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
        </li>`;
    });

    document.querySelector(UISelectors.itemList).innerHTML = html;
  }

  function getItemInputVals() {
    return {
      name: document.querySelector(UISelectors.itemNameInput).value,
      calories: document.querySelector(UISelectors.itemCaloriesInput).value
    };
  }

  function hideList() {
    document.querySelector(UISelectors.itemList).style.display = 'none';
  }
  
  function addListItem(newItem) {
    const li = document.createElement('li');

    document.querySelector(UISelectors.itemList).style.display = 'block';

    li.className = 'collection-item';
    li.id = `item-${newItem.id}`;
    li.innerHTML = `
      <strong>${newItem.name}: </strong> <em>${newItem.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;

    document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
  }

  function updateListItem(updatedItem) {
    let listItems = document.querySelectorAll(UISelectors.listItems);

    listItems = Array.from(listItems);

    listItems.forEach(function(listItem) {
      const itemId = listItem.getAttribute('id');

      if(itemId === `item-${updatedItem.id}`) {
        document.querySelector(`#${itemId}`).innerHTML = `
          <strong>${updatedItem.name}: </strong> <em>${updatedItem.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
      }
    });
  }
  
  function removeListItem(id) {
    const itemId = `#item-${id}`;
    const item = document.querySelector(itemId);

    item.remove();
  }

  function removeAllListItems() {
    let listItems = document.querySelectorAll(UISelectors.listItems);

    listItems = Array.from(listItems);

    listItems.forEach(function(listItem) {
      listItem.remove();
    });
  }

  function showTotalCalories(totalCalories) {
    document.querySelector('.total-calories').textContent = totalCalories;
  }

  function clearInputs() {
    document.querySelector(UISelectors.itemNameInput).value = '';
    document.querySelector(UISelectors.itemCaloriesInput).value = '';
  }

  function addItemToForm() {
    document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
    document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
  }

  function setInitialState() {
    UICtrl.clearInputs();
    document.querySelector(UISelectors.addBtn).style.display = 'inline';
    document.querySelector(UISelectors.updateBtn).style.display = 'none';
    document.querySelector(UISelectors.deleteBtn).style.display = 'none';
    document.querySelector(UISelectors.backBtn).style.display = 'none'; 
  }

  function setEditState() {
    document.querySelector(UISelectors.addBtn).style.display = 'none';
    document.querySelector(UISelectors.updateBtn).style.display = 'inline';
    document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
    document.querySelector(UISelectors.backBtn).style.display = 'inline';
  }

  function getSelectors() {
    return UISelectors;
  }
})();

const App = (function(StorageCtrl, ItemCtrl, UICtrl) {
  const loadEventListeners = function() {
    const UISelectors = UICtrl.getSelectors();

    document.addEventListener('keypress', function(e) {
      if(e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        
        return false;
      }
    });

    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearInputs);
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
  };

  const itemAddSubmit = function(e) {
    const inputVals = UICtrl.getItemInputVals();

    if(inputVals.name !== '' && inputVals.calories !== '') {
      const newItem = ItemCtrl.addItem(inputVals.name, inputVals.calories);
      const totalCalories = ItemCtrl.getTotalCalories();

      StorageCtrl.storeItem(newItem);

      UICtrl.addListItem(newItem);
      UICtrl.showTotalCalories(totalCalories);

      UICtrl.clearInputs();
    }
    
    e.preventDefault();
  };

  const itemEditClick = function(e) {
    if(e.target.classList.contains('edit-item')) {
      const itemListId = e.target.parentNode.parentNode.id;
      const listIdArr = itemListId.split('-');
      const itemId = parseInt(listIdArr[1]);
      const itemToEdit = ItemCtrl.getItemById(itemId);

      ItemCtrl.setCurrentItem(itemToEdit);
      UICtrl.addItemToForm();
      UICtrl.setEditState();
    }

    e.preventDefault();
  };

  const itemUpdateSubmit = function(e) {
    const inputVals = UICtrl.getItemInputVals();
    const updatedItem = ItemCtrl.updateItem(inputVals.name, inputVals.calories);
    const totalCalories = ItemCtrl.getTotalCalories();

    if(inputVals.name === '' || inputVals.calories === '') {
      e.preventDefault();
    }
    else {
      StorageCtrl.updateItem(updatedItem);

      UICtrl.updateListItem(updatedItem);
      UICtrl.setInitialState();

      UICtrl.showTotalCalories(totalCalories);
  
      e.preventDefault();
    }
  };

  const itemDeleteSubmit = function(e) {
    const currentItem = ItemCtrl.getCurrentItem();
    const totalCalories = ItemCtrl.getTotalCalories();
    
    ItemCtrl.deleteItem(currentItem.id);

    StorageCtrl.deleteItem(currentItem.id);

    UICtrl.removeListItem(currentItem.id);
    UICtrl.setInitialState();
    UICtrl.showTotalCalories(totalCalories);

    e.preventDefault();
  };

  const clearAllItemsClick = function(e) {
    StorageCtrl.deleteAllItems();
    ItemCtrl.deleteAllItems();

    UICtrl.showTotalCalories(ItemCtrl.getTotalCalories());
    UICtrl.removeAllListItems();
    UICtrl.hideList();
  };

  init();

  function init() {
    const items = ItemCtrl.getItems();
    const totalCalories = ItemCtrl.getTotalCalories();
    
    UICtrl.setInitialState();

    if(items.length === 0) {
      UICtrl.hideList()
    }
    else {
      UICtrl.populateItemList(items);
      UICtrl.showTotalCalories(totalCalories);
    }
    
    loadEventListeners();
  }
})(StorageCtrl, ItemCtrl, UICtrl);