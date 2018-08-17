var sapper = document.getElementById('sapper');

var MyMineSweeper = {
  init: function(obj) {
    this.Width = obj ? obj.Width : 7;
    this.Height = obj ? obj.Height : 7;
    this.bomb = obj ? obj.bomb : Math.floor(this.Height * this.Width / 4);

    this.generateGUI();
  },

  generateGUI: function() {
    return null;
  },

  writeMainContainer: function() {
    return null;
  },
};

MyMineSweeper.init();


// function whiteField () {

//   const sapper = document.getElementById('sapper');
//   const valueCellVertical = document.getElementById('valueCellVertical');
//   const valueCellHorizontal = document.getElementById('valueCellHorizontal');

//   // создание поля

//   if  (valueCellVertical.value && valueCellHorizontal.value){
//     const border = document.createElement('div');
//     border.innerHTML = -1;
//     console.log(border);
//     while (sapper.firstChild) {
//       sapper.removeChild(sapper.firstChild);
//     }
//     for (let i = 0; i < valueCellVertical.value; i += 1) {
//       const row = document.createElement('div');
//       row.className = 'row';
//       for (let j = 0; j < valueCellHorizontal.value; j += 1) {
//         const calc = Math.floor(Math.random()*5);
//         const grid = document.createElement('div');
//         grid.className = 'item';
//         grid.innerHTML = calc;
//         row.appendChild(grid);
//       }
//       row.appendChild(border);
//       console.log(row);
//       sapper.appendChild(row);
//     }
//   }
// };
