var MyMineSweeper = {
  init: function (obj) {
    this.Width = obj ? obj.Width : 7;
    this.Height = obj ? obj.Height : 7;
    this.bomb = obj ? obj.bomb : 4;
    this.data = [];
    this.defusedBombsCount = 0;
    this.flagCount = 0;
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
    timer.className = 'timer';
    timer.innerHTML = timerVal;
    elem.appendChild(timer);
    setInterval(function() {
      timerVal += 1;
      timer.innerHTML = timerVal;
    }, 1000);
  },

  generateGUI: function () {
    var sapper = document.getElementById('sapper');
    var field = document.createElement('div');
    field.className = 'field';
    this.createTimer(sapper);
    // Generate fields
    for (var i = 0; i < this.data.length; i += 1) {
     
      var row = document.createElement('div');
      row.className = 'row';
      field.appendChild(row);
      sapper.appendChild(field);
      for (var j = 0; j < this.data[i].length; j += 1) {
        var hiddenCell = document.createElement('div');
        hiddenCell.className = 'item';
        if (this.data[i][j] !== -1) {
          var callOnce = this.clickOnCell.bind(this, this.data, i, j);
          var flagBomb = this.defuseTheBomb.bind(this, this.data, i, j);
          hiddenCell.className = 'item hiddenCell';
          hiddenCell.addEventListener('click', callOnce);
          hiddenCell.addEventListener('contextmenu', flagBomb);
        }
        row.appendChild(hiddenCell);
      }
    }
  },

  generateArrayNodeElements: function () {
    var hiddenCell = document.getElementsByClassName('item');
    var arr = [];
    var cells = [];
    for (var i = 0; i < hiddenCell.length; i += 1) {
      if (i % (this.Width + 2) === 0) {
        cells = [];
        cells.push(hiddenCell[i]);
        arr.push(cells);
      } else {
        cells.push(hiddenCell[i]);
      }
    }
    return arr;
  },

  defuseTheBomb: function(data, x, y) {
    var sapper = document.getElementById('sapper');
    event.preventDefault();

    if (this.flagCount > 0 && event.target.textContent === 'C') {
      while (event.target.firstChild) {
        event.target.removeChild(event.target.firstChild);
      }
      this.flagCount -= 1;
    } else if (this.flagCount < this.bomb && !event.target.getAttribute('data-check')) {
      event.target.innerHTML = 'C';
      this.flagCount += 1;
    }

    if (data[x][y] === 88 && event.target.textContent === 'C') {
      this.defusedBombsCount += 1;
    } else if (this.flagCount < this.bomb && data[x][y] === 88 && event.target.textContent !== 'C') {
      this.defusedBombsCount -= 1;
    }

    // win event
    if (this.defusedBombsCount === this.bomb) {
      var win = document.createElement('div');
      win.className = 'winContainer';
      win.innerHTML = 'You win!';
      sapper.appendChild(win);
    }
  },

  clickOnCell: function (data, x, y) {
    var arrayNode = this.generateArrayNodeElements();
    if (event.target.textContent === 'C') {
      while (event.target.firstChild) {
        event.target.removeChild(event.target.firstChild);
      }
    }

    // Enter from recursion
    if (data[x][y] < 0 || arrayNode[x][y].getAttribute('data-check')) {
      return;
    }

    // Recursion
    if (data[x][y] === 0) {
      arrayNode[x][y].setAttribute('data-check', true);
      this.clickOnCell(data, x, y+1); // Right
      this.clickOnCell(data, x+1, y); // Down
      this.clickOnCell(data, x+1, y+1); // Down Right
      this.clickOnCell(data, x, y-1); // Left
      this.clickOnCell(data, x-1, y); // Up
      this.clickOnCell(data, x-1, y-1); // Up Left
    } else if (data[x][y] === 88) {
      var loss = document.createElement('div');
      loss.className = 'lossContainer';
      loss.innerHTML = 'You loss';
      sapper.appendChild(loss);
    } else {
      arrayNode[x][y].innerHTML = data[x][y];
    }
  },
};

MyMineSweeper.init();
