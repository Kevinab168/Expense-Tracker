// Module to control Item Data structure and functionality
const ItemCtrl = (function() {
  // Have a variable to hold the data -> will change with local storage. 
  const data = {
    itemList: [], 
    currentItem: null, 
    totalCost: null, 
  }; 

  return { 
    // Console log the data values 
    logData: function() {
      console.log(data); 
    }, 
    expenseData: this.data, 
    addItemToStruc: function(iname, iprice, icategory, iday) { 
      // create the item object. 
      // figure out what the id should be. 
      const iId = data.itemList.length; 
      // Create the new object data structure
      const newObject = { 
        id: iId,
        name:iname, 
        category: icategory, 
        cost: iprice, 
        day: iday, 
      }
      // add the item to the data list. 
      data.itemList.push(newObject); 
      // adjust the total price
      data.totalCost += iprice; 

      // return the newObject
      return newObject
    }, 
    changecurrentItem: function(id) { 
      //  Match the id with the value set in the data stucture. 
      data.itemList.forEach(item => {  
        if (item.id === id) { 
          data.currentItem = item; 
        }
      }); 
      return data.currentItem; 
    }, 
    emptyCurrentItem: function() { 
      data.currentItem = null; 
    }, 
    makeEditstoItem: function() { 
      // Get the changes 
      const newName = document.querySelector(UICtrl.UISelectors.expenseName).value; 
      const newPrice = document.querySelector(UICtrl.UISelectors.expensePrice).value; 
      const newCategory = document.querySelector(UICtrl.UISelectors.category).value; 
      const newDay = document.querySelector(UICtrl.UISelectors.day).value; 

      // Reflect the changes to the current item. This will also change itemList array. 
      data.currentItem.name = newName; 
      data.currentItem.cost = newPrice; 
      data.currentItem.category = newCategory;
      data.currentItem.day = newDay

      return data.currentItem; 
    },
    // Remove the current Item from the data structure.  
    removeCurrentItemFromDataStructure: function() { 
      // Iterate through the item list and remove the current item. 
      let removedItem; 
      // Adjust the total Cost in the data structure
      data.totalCost -= data.currentItem.cost; 
      // Remove the item in the data stucture 
      data.itemList.forEach((item, index) => { 
        if (item === data.currentItem) { 
          data.itemList.splice(index, 1); 
        }
      })
      return data.currentItem; 
    }, 
    giveData: data, 
  }

})(); 


// Module to control User Interface 
const UICtrl = (function() { 
  // private methods and information 
  const uiValues = { 
    expenseName: '#expense-name', 
    expensePrice: '#expense-cost', 
    category: '#category-selection',
    day: '#day', 
    alerts:'.alertMsg', 
    // General button Selectors
    addBtn: '#addBtn', 
    editBtn: '#editBtn', 
    deleteBtn: '#deleteBtn',
    backBtn: '#backBtn',
    visBtn: '#visBtn', 
    // Area Selectors
    chartOptionsBtn: '#chart-options', 
    expenseList: '#expense-collection', 
    myChartArea: '#piechart',
    mainHeader: '#main-header',
    inputCardContainer: '#cardColumn',   
    // Modal Selectors
    chartOptionDay: '#chart-day', 
    chartOptionType: '#chart-type', 
    chartOptionsSave: '#chartOptionsSave', 
    chartOptionsBack: '#chartOptionsBack', 
  }
  

  // public methods 
  return {
    UISelectors: uiValues, 
    addItemToUI: function(newExpenseObj) {
      // create the list item and set its properties.
      const newlistItem = document.createElement('a'); 
      newlistItem.id = `expense-${newExpenseObj.id}`; 
      newlistItem.className = 'collection-item'; 
      newlistItem.href = '#!';  

      // Adjust for the differnt badge colors (depending on the kind of activity)
      if (newExpenseObj.category === 'food') { 
        newlistItem.innerHTML += `<span class="new badge blue" data-badge-caption="food"></span>`
      } else if (newExpenseObj.category === 'buisness') { 
        newlistItem.innerHTML += `<span class="new badge red" data-badge-caption="buisness"></span>`
      } else if (newExpenseObj.category === 'livingExpense') { 
        newlistItem.innerHTML += `<span class="new badge purple" data-badge-caption="living expense"></span>`
      } else if (newExpenseObj.category === 'leisure') { 
        newlistItem.innerHTML += `<span class="new badge green" data-badge-caption="leisure"></span>`
      } else { 
        newlistItem.innerHTML += `<span class="new badge orange" data-badge-caption="other"></span>`
      }

      // Add which day this is for as a badge. 
      switch(newExpenseObj.day) { 
        case 'monday': 
          newlistItem.innerHTML += `<span class="new badge teal" data-badge-caption="monday"></span>`; 
          break 
        case 'tuesday': 
          newlistItem.innerHTML += `<span class="new badge deep-orange darken-3" data-badge-caption="tuesday"></span>`; 
          break 
        case 'wednesday': 
          newlistItem.innerHTML += `<span class="new badge grey darken-4" data-badge-caption="wednesday"></span>`; 
          break 
        case 'thursday': 
          newlistItem.innerHTML += `<span class="new badge indigo" data-badge-caption="thursday"></span>`; 
          break 
        case 'friday': 
          newlistItem.innerHTML += `<span class="new badge pink darken-3" data-badge-caption="friday"></span>`; 
          break 
        case 'saturday': 
          newlistItem.innerHTML += `<span class="new badge cyan darken-4" data-badge-caption="saturday"></span>`; 
          break 
        case 'sunday': 
          newlistItem.innerHTML += `<span class="new badge red darken-4" data-badge-caption="sunday"></span>`; 
          break 
      }

      // Add the main contents of the list item and set it. 
      newlistItem.innerHTML += `${newExpenseObj.name}`


      // Add the cost as a green badge 
      newlistItem.innerHTML += `<span class="new badge green darken-4" data-badge-caption="$ ${newExpenseObj.cost}"></span>`
      
      // Add this item to the item list 
      const itemList = document.querySelector(this.UISelectors.expenseList); 
      itemList.appendChild(newlistItem); 
    }, 
    editItemUI: function(item) { 
      // Find the item in the list items. 
      let allLiItems = document.querySelectorAll('.collection-item'); 
      allLiItems.forEach(listItem => { 
        if (listItem.id === `expense-${item.id}`) { 
          // Make the changes to the category badge 
          if (item.category === 'food') { 
            listItem.innerHTML = `<span class="new badge blue" data-badge-caption="${item.category}"></span>${item.name}`
          } else if (item.category === 'buisness') { 
            listItem.innerHTML = `<span class="new badge red" data-badge-caption="${item.category}"></span>${item.name}`
          } else if (item.category === 'livingExpense') { 
            listItem.innerHTML = `<span class="new badge purple" data-badge-caption="${item.category}"></span>${item.name}`
          } else if (item.category === 'leisure') { 
            listItem.innerHTML = `<span class="new badge green" data-badge-caption="${item.category}"></span>${item.name}`
          } else { 
            listItem.innerHTML = `<span class="new badge orange" data-badge-caption="${item.category}"></span>${item.name}`
          }
          // Make the adjustment to the day 
          switch(item.day) { 
            case 'monday': 
              listItem.innerHTML += `<span class="new badge teal" data-badge-caption="monday"></span>`; 
              break 
            case 'tuesday': 
              listItem.innerHTML += `<span class="new badge deep-orange darken-3" data-badge-caption="tuesday"></span>`; 
              break 
            case 'wednesday': 
              listItem.innerHTML += `<span class="new badge grey darken-4" data-badge-caption="wednesday"></span>`; 
              break 
            case 'thursday': 
              listItem.innerHTML += `<span class="new badge indigo" data-badge-caption="thursday"></span>`; 
              break 
            case 'friday': 
              listItem.innerHTML += `<span class="new badge pink darken-3" data-badge-caption="friday"></span>`; 
              break 
            case 'saturday': 
              listItem.innerHTML += `<span class="new badge cyan darken-4" data-badge-caption="saturday"></span>`; 
              break 
            case 'sunday': 
              listItem.innerHTML += `<span class="new badge red darken-4" data-badge-caption="sunday"></span>`; 
              break 
          }


          // Append the data about the item cost as a badge 
          listItem.innerHTML += `<span class="new badge green darken-4" data-badge-caption="$ ${item.cost}"></span>`
        }
      })
    }, 
    // Function to remove the item from the UI Structure
    removeItemUI: function(currentItem) { 
      const listContainer = document.querySelector(this.UISelectors.expenseList); 
      let allLiItems = document.querySelectorAll('.collection-item'); 
      allLiItems.forEach(listItem => { 
        if (listItem.id === `expense-${currentItem.id}`) { 
          listContainer.removeChild(listItem); 
        }
      })
    }, 
    populateInput: function(expenseObj) { 
      document.querySelector(UICtrl.UISelectors.expenseName).value = expenseObj.name; 
      document.querySelector(UICtrl.UISelectors.expensePrice).value = expenseObj.cost;
      // Change the select option using jquery. 
      $(this.UISelectors.category).val(expenseObj.category); 
      $(this.UISelectors.category).formSelect(); 

      // Make the changes the day of the week 
      $(this.UISelectors.day).val(expenseObj.day); 
      $(this.UISelectors.day).formSelect(); 
      
    }, 
    // Clear the input 
    clearInput: function() { 
      document.querySelector(this.UISelectors.expenseName).value = ''; 
      document.querySelector(this.UISelectors.expensePrice).value = '';  
    }, 
    // Clear the Edit State
    clearEditState: function() { 
      document.querySelector(this.UISelectors.addBtn).style.display = 'inline-block'; 
      document.querySelector(this.UISelectors.editBtn).style.display = 'none'; 
      document.querySelector(this.UISelectors.deleteBtn).style.display = 'none'; 
      document.querySelector(this.UISelectors.backBtn).style.display = 'none'; 
    }, 
    showEditState: function() { 
      document.querySelector(this.UISelectors.addBtn).style.display = 'none'; 
      document.querySelector(this.UISelectors.editBtn).style.display = 'inline-block'; 
      document.querySelector(this.UISelectors.deleteBtn).style.display = 'inline-block'; 
      document.querySelector(this.UISelectors.backBtn).style.display = 'inline-block'; 
    }, 
    // Create a notification
    createNotification: function(message, className) { 
      // Remove any alert
      this.removeNotification(); 
      // Create the alert
      const alertMessage = document.createElement('div'); 
      alertMessage.textContent = message; 
      alertMessage.setAttribute('class', className); 
      
      if (alertMessage.className === 'error') { 
        // Allow it to match the materialize class=
        alertMessage.className += ' red darken-1'
      }


      // Add the alert className -> use when searching 
      alertMessage.className += ' alertMsg'

      // Append the message to under the first h1 
      const cardContainer = document.querySelector(this.UISelectors.inputCardContainer); 
      cardContainer.insertBefore(alertMessage, cardContainer.childNodes[0]); 

      // Set a timeout on the created alert to remove it. 
      setTimeout(this.removeNotification, 2000);  

    }, 
    // Remove all created notifications
    removeNotification: function() { 
      while (document.querySelector(UICtrl.UISelectors.alerts)) { 
        const allAlerts = document.querySelectorAll(UICtrl.UISelectors.alerts); 
        allAlerts.forEach(element => element.remove()); 
      }
    }, 
    setModalParams: function(day, type) {
      $(this.UISelectors.chartOptionDay).val(day); 
      $(this.UISelectors.chartOptionDay).formSelect(); 

      $(this.UISelectors.chartOptionType).val(type); 
      $(this.UISelectors.chartOptionType).formSelect(); 
      
    }
  }; 
})(); 



// Controller for Data Visualizations
const DataViewer = (function() {
  // Starting Data Structure of the chart. These values will get overwritten if the user decides to. 
  // These values will change when the user clicks on the chart options button. 
  const chartPresets = { 
    type: 'pie', 
    dataSet: 'monday'
  }
 


  // Obtain the Data 
  const dataLabels = ['Food', 'Buisness', 'Living Expense', 'Leisure', 'Other']
  
  // Analyze and Breakdown the Data Sets 
  const breakDownCategData = function(data) { 
    // Initilize the data Obj
    let dataObj = { 
      'food': 0, 
      'buisness': 0,  
      'livingExpense': 0, 
      'leisure': 0, 
      'other': 0
    }
   
    // Break down the cost from the ddata list 
    data.forEach(item => { 
      if (chartPresets.dataSet === 'week') { 
        // Get the weekly totals 
        switch (item.category) { 
          case 'food': 
          dataObj.food += item.cost; 
          break; 
          case 'buisness': 
          dataObj.buisness += item.cost; 
          break; 
          case 'livingExpense': 
          dataObj.livingExpense += item.cost; 
          break; 
          case 'leisure': 
          dataObj.leisure += item.cost; 
          break; 
          case 'other': 
          dataObj.other += item.cost; 
          break; 
        }
      } else if (item.day === chartPresets.dataSet) { 
        switch (item.category) { 
          case 'food': 
          dataObj.food += item.cost; 
          break; 
          case 'buisness': 
          dataObj.buisness += item.cost; 
          break; 
          case 'livingExpense': 
          dataObj.livingExpense += item.cost; 
          break; 
          case 'leisure': 
          dataObj.leisure += item.cost; 
          break; 
          case 'other': 
          dataObj.other += item.cost; 
          break; 
        }
      }
    }) 
    
    return dataObj
  }

  const createChart = function() {
    // Get the analyzed Data
    const analyzedData = breakDownCategData(ItemCtrl.giveData.itemList); 

    // Create the chart now 
    const ctx = document.getElementById('myChart').getContext('2d'); 
    const myChart = new Chart(ctx, { 
      type: chartPresets.type, 
      data: { 
        labels: dataLabels, 
        datasets: [{
          label: 'Expenses across Categories', 
          data: [analyzedData.food, analyzedData.buisness, analyzedData.livingExpense,  analyzedData.leisure, analyzedData.other], 
            backgroundColor: [
                'rgba(33, 150, 243, 0.5)',
                'rgba(244, 67, 54, 0.5)',
                'rgba(156, 39, 176, 0.5)',
                'rgba(76, 175, 80, 0.5)',
                'rgba(255, 152, 0, 0.5)',
            ],
            borderColor: [
                'rgba(33, 150, 243, 0.5)',
                'rgba(244, 67, 54, 0.5)',
                'rgba(156, 39, 176, 0.5)',
                'rgba(76, 175, 80, 0.5)',
                'rgba(255, 152, 0, 0.5)',
            ],
            borderWidth: 1
        }]
      },
      options: { 
        title: { 
          display: true, 
          text: `Expenses for ${chartPresets.dataSet}`
        }
      } 
    })

    return myChart

  }

// Function to check if there is data in the data object. 
const checkData = function() { 
  const analyzedData = breakDownCategData(ItemCtrl.giveData.itemList); 
  for (cat in analyzedData) { 
    if (analyzedData[cat] > 0) { 
      return true
    } 
  }

  return false
}

return {  
  visualizeData: function() { 
    // Clear the parent Container if you need to. 
    this.resetCanvas(); 

    // Check if there is data to display, otherwise notify the user to input data 
    if (checkData()) { 
      // Create the chart 
      createChart(); 
    } else { 
      // Create a notification letting the user that there is no data to display. 
      console.log('Something Went wrong');
      // Materialize way of creating a notification. 
      M.toast({html: `There is no data for ${chartPresets.dataSet}`}) 
    }
  }, 
  resetCanvas: function() { 
    // Clear the child elements of the parent container. 
    const parentContainer = document.getElementById('c-area'); 
    parentContainer.innerHTML = ''; 
    const newCanvas = document.createElement('canvas'); 
    newCanvas.id = 'myChart'; 
    parentContainer.appendChild(newCanvas); 
  }, 
  // Change presets data structure 
  changeChartOptions: function(day, type) { 
    chartPresets.dataSet = day; 
    chartPresets.type = type; 

    return chartPresets; 
  }, 
  // Log the option data 
  logChartData: function() { 
    console.log(chartPresets); 
  },
  // Function that returns the chart preset values for document  
  getChartPresets: function() { 
    return chartPresets; 
  }, 
}

})(); 



const AppCtrl = (function() { 
  const loadEventListners = function() { 
    // Add button add event listner 
    document.querySelector(UICtrl.UISelectors.addBtn).addEventListener('click', addItemClick); 

    // Add a listner for what item to edit 
    document.querySelector(UICtrl.UISelectors.expenseList).addEventListener('click', chooseExpense); 

    // Edit buton event listner 
    document.querySelector(UICtrl.UISelectors.editBtn).addEventListener('click', editItemClick); 

    // Delete Button event listner 
    document.querySelector(UICtrl.UISelectors.deleteBtn).addEventListener('click', deleteBtnClick); 

    // Back button Functionality 
    document.querySelector(UICtrl.UISelectors.backBtn).addEventListener('click', backBtnClick); 


    // Visualize Button Functionality 
    document.querySelector(UICtrl.UISelectors.visBtn).addEventListener('click', visualizeBtnclick); 

    document.querySelector(UICtrl.UISelectors.chartOptionsBtn).addEventListener('click', chartOptionsBtnClick); 

    // Chart Options Save Functionality 
    document.querySelector(UICtrl.UISelectors.chartOptionsSave).addEventListener('click', chartOptionsSaveResult); 

  } 

  // Function to ensure that proper values are shown in the beginning
  const addItemClick = function() { 
    // get the parts of the item that matter
    const itemName = document.querySelector(UICtrl.UISelectors.expenseName).value; 
    const itemPrice = parseInt(document.querySelector(UICtrl.UISelectors.expensePrice).value); 
    const itemCategory = document.querySelector(UICtrl.UISelectors.category).value; 
    const itemDay = document.querySelector(UICtrl.UISelectors.day).value; 

    

    // Only adjust the values if there are values present 
    if (itemName && itemPrice) { 
    // Add the expense to the Item Data Structure 
    const newExpenseObj = ItemCtrl.addItemToStruc(itemName, itemPrice, itemCategory, itemDay); 
    // Reflect the change in the UI 
    UICtrl.addItemToUI(newExpenseObj); 
    } else { 
      // Create a notification that the user has to fill out data
      UICtrl.createNotification('Please fill out the form', 'error')
    }
  } 
  // Reflect the changes to the edited item to the data structure. 
  const editItemClick = function() { 
    // Reflect the changes of the current item to the data list. 
    const changedItem = ItemCtrl.makeEditstoItem();
    // Make changes to the UI to show these changes. 
    UICtrl.editItemUI(changedItem);  
    // Clear the input 
    UICtrl.clearInput(); 
    // Display the regular UI configuration. 
    UICtrl.clearEditState(); 
  }
  const chooseExpense = function(e) { 
    // The goal is to populate the input values with the selected item. 
    // Make sure you are selecting a list item. 
    if (e.target.className === 'collection-item') { 
      const id= parseInt(e.target.id.split('-')[1]); 
      // Set the current item equal to this id 
      const cItem = ItemCtrl.changecurrentItem(id);
      // Reflect the change in the UI
      UICtrl.populateInput(cItem); 
      // Show the edit state 
      UICtrl.showEditState(); 
    }
  }
  const deleteBtnClick = function(e) { 
    // Clear the current Item from the data structure 
    const removedItem = ItemCtrl.removeCurrentItemFromDataStructure()
    // Remove the current Item from the UI. 
    UICtrl.removeItemUI(removedItem); 
    // Clear the current Item to nothing. 
    ItemCtrl.emptyCurrentItem(); 
    // Clear the input
    UICtrl.clearInput(); 
    // Clear the edit state 
    UICtrl.clearEditState(); 
  }
  const backBtnClick = function() {
    // Clear the Input 
    UICtrl.clearInput(); 
    // Clear the edit state 
    UICtrl.clearEditState(); 
  } 

  const visualizeBtnclick = function() { 
    // Create a visualization of the data 
    DataViewer.visualizeData(); 
  }

  // Functionality whenever the chart options button is clicked on. 
  const chartOptionsBtnClick = function() { 
    // Set the intial modal Parameters 
    const chartOptionsVal = DataViewer.getChartPresets(); 
    UICtrl.setModalParams(chartOptionsVal.dataSet, chartOptionsVal.type)
  }

  // Chart Options 
  const chartOptionsSaveResult = function() { 
    // Retrieve the Day of the Week and the chart type. 
    const day = document.querySelector(UICtrl.UISelectors.chartOptionDay).value; 
    const type = document.querySelector(UICtrl.UISelectors.chartOptionType).value; 

    // Update the Data Structure
    DataViewer.changeChartOptions(day, type); 
    
  }
  return { 
    init: function() { 
      // Intilize the consditions for the app to function.
      // Initilize materialize select with jquery. 
      $(document).ready(function(){
        $('select').formSelect();
      });
      // Initilize the modal button with jquery. 
      $(document).ready(function(){
        $('.modal').modal();
      });
      // load all the event listners. 
      loadEventListners(); 
    }
  }
})()

AppCtrl.init(); 


