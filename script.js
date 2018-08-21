var MyMineSweeper = {
  init: function (obj) {
    this.Width = obj ? obj.Width : 7;
    this.Height = obj ? obj.Height : 7;
    this.bomb = obj ? obj.bomb : 4;
    this.data = [];
    this.generateData();
  },

  generateData: function () {
    var widthWithBorder = this.Width + 2;
    var heightWithBorder = this.Height + 2;
    
    // Genering map
    for (var i = 0; i < widthWithBorder; i += 1) {
      this.data.push([]);
      for (var j = 0; j < heightWithBorder; j += 1) {
        if (j === 0 || j === heightWithBorder - 1 || i === 0 || i === widthWithBorder - 1) {
          this.data[i][j] = -1;
        } else {
          this.data[i][j] = 0;
        }
      }
    }
    // Genering bombs
    var bombsCords = function (fields) {
      return Math.floor(Math.random()*(fields - 1) + 1);
    }

    for(var i = 0; i < this.bomb; i += 1) {
      var randX = bombsCords(this.Width);
      var randY = bombsCords(this.Height);
      if (this.data[randX][randY] === 88) {
        i -= 1;
      }
      this.data[randX][randY] = 88;
    }
    
    // Genering fields
    for (var i = 0; i < this.Width; i += 1) {
      for (var j = 0; j < this.Height; j += 1) {
        if (this.data[i][j] === 88) {
          this.placeNumbers(i, j);
        }
      }
    }
    console.log(this.data);
    this.generateGUI();
  },


  // Generate numbers rules
  placeNumbers: function(x, y) {
    if (this.data[x][y+1] !== -1 && this.data[x][y+1] !== 88) {
      this.data[x][y+1] += 1;
    }

    if (this.data[x+1][y] !== -1 && this.data[x+1][y] !== 88) {
      this.data[x+1][y] += 1;
    }

    if (this.data[x][y-1] !== -1 && this.data[x][y-1] !== 88) {
      this.data[x][y-1] += 1;
    }

    if (this.data[x-1][y] !== -1 && this.data[x-1][y] !== 88) {
      this.data[x-1][y] += 1;
    }

    if (this.data[x+1][y+1] !== -1 && this.data[x+1][y+1] !== 88) {
      this.data[x+1][y+1] += 1;
    }

    if (this.data[x+1][y-1] !== -1 && this.data[x+1][y-1] !== 88) {
      this.data[x+1][y-1] += 1;
    }

    if (this.data[x-1][y+1] !== -1 && this.data[x-1][y+1] !== 88) {
      this.data[x-1][y+1] += 1;
    }

    if (this.data[x-1][y-1] !== -1 && this.data[x-1][y-1] !== 88) {
      this.data[x-1][y-1] += 1;
    }
  },

  createTimer: function (elem) {
    var timer = document.createElement('div');
    var timerVal = 0;
    timer.innerHTML = timerVal;
    elem.appendChild(timer);
    setInterval(function() {
      timerVal += 1;
      timer.innerHTML = timerVal;
    }, 1000);
  },

  generateGUI: function () {
    var sapper = document.getElementById('sapper');
    this.createTimer(sapper);

    // Generate fields
    for (var i = 0; i < this.data.length; i += 1) {
      var row = document.createElement('div');
      row.className = 'row';
      sapper.appendChild(row);
      for (var j = 0; j < this.data[i].length; j += 1) {
        var hiddenCell = document.createElement('div');
        hiddenCell.className = 'item';
        if (this.data[i][j] !== -1) {
          var callOnce = this.clickOnCell.bind(this, this.data, i, j);
          var flagBomb = this.defuseTheBomb.bind(this, this.data[i][j]);
          hiddenCell.className = ' item hiddenCell';
          hiddenCell.addEventListener('click', callOnce);
          hiddenCell.addEventListener('contextmenu', flagBomb);
        }
        row.appendChild(hiddenCell);
      }
    }
  },

  defuseTheBomb: function(data) {
    event.preventDefault();
    
    if (!event.target.getAttribute('data-check')) {
      event.target.innerHTML = 'C';
    }
  },

  clickOnCell: function (data, x, y) {
    var hiddenCell = document.getElementsByClassName('item');
    var arr = [];
    var cells = [];

    if (data[x][y] < 0) {
      return; 
    }

    // Generate array NodeElements 
    for (var i = 0; i < hiddenCell.length; i += 1) {
      if (i % (this.Width + 2) === 0) {
        cells = [];
        cells.push(hiddenCell[i]);
        arr.push(cells);
      } else {
        cells.push(hiddenCell[i]);
      }
    }

    if (event.target.textContent === 'C') {
      while (event.target.firstChild) {
        event.target.removeChild(event.target.firstChild);
      }
    } 

    // Enter from recursion
    if (arr[x][y].getAttribute('data-check')) {
      return;
    }

    // Recursion
    if (data[x][y] === 0) {
      arr[x][y].setAttribute('data-check', true);
      
      this.clickOnCell(data, x, y+1); // Right
      this.clickOnCell(data, x+1, y); // Down
      this.clickOnCell(data, x+1, y+1); // Down Right
      this.clickOnCell(data, x, y-1); // Left
      this.clickOnCell(data, x-1, y); // Up
      this.clickOnCell(data, x-1, y-1); // Up Left
    } else {
      arr[x][y].innerHTML = data[x][y];
    }
  },
};

MyMineSweeper.init();


//     while (sapper.firstChild) {
//       sapper.removeChild(sapper.firstChild);
//     }
