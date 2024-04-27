let cell= {
  id:0,
  value:0
}

let grid = Array.from({length:16},(_, index) => ({ ...cell, id: index + 1 }));


function init_game() {
  let times=0;
  while(times<2) {
    let rand=Math.floor(Math.random()*16+1);
    if (check_val(rand,2)) {
      display_cell(rand,2);
      times++;
    }
  }
}

function generate_cell() {
  let rand;
  do {
    rand=Math.floor(Math.random()*16+1);
  } while (!check_val(rand,2));
  display_cell(rand,2);
}

function check_val(n,val) {
  if (grid[n-1].value===0) {
    grid[n-1].value=val;
    return true;
  } else {
    return false;
  }
}


function display_cell(n,val) {
  if (val!==0) {
    document.querySelector(`.box${n}`).innerHTML=`${val}`; 
  } else {
    document.querySelector(`.box${n}`).innerHTML=``;
  }
  color_cell(n,val);
}

function color_cell(n, val) {
  const box = document.querySelector(`.box${n}`);
  switch (val) {
    case 2:
      box.style.backgroundColor = '#EEE4DA';
      break;

    case 4:
      box.style.backgroundColor = '#EDE0C8';
      break;

    case 8:
      box.style.backgroundColor = '#F2B179';
      break;

    case 16:
      box.style.backgroundColor = '#F59563';
      break;

    case 32:
      box.style.backgroundColor = '#F67C5F';
      break;

    case 64:
      box.style.backgroundColor = '#F65E3B';
      break;

    case 128:
      box.style.backgroundColor = '#EDCF72';
      break;

    case 256:
      box.style.backgroundColor = '#EDCC61';
      break;

    case 512:
      box.style.backgroundColor = '#EDC850';
      break;

    case 1024:
      box.style.backgroundColor = '#EDC53F';
      break;

    case 2048:
      box.style.backgroundColor = '#EDC22E';
      break;

    default:
      box.style.backgroundColor = ' rgba(238, 228, 218, 0.35)';
      break;
  }
}

init_game();


document.addEventListener('keydown',handle_keydown);


function handle_keydown(event) {
  let test=JSON.stringify(grid);
  switch (event.key) {
    case 'ArrowUp':
      handle_gaps('up');
      merge('up');
      handle_gaps('up');
      if (test!==JSON.stringify(grid)) {
        generate_cell();
      }
      break;

    case 'ArrowDown':
        handle_gaps('down');
        merge('down');
        handle_gaps('down');
        if (test!==JSON.stringify(grid)) {
          generate_cell();
        }
      break;

    case 'ArrowRight':
        handle_gaps('right');
        merge('right');
        handle_gaps('right');
        if (test!==JSON.stringify(grid)) {
          generate_cell();
        }
      break;

    case 'ArrowLeft':
        handle_gaps('left');
        merge('left');
        handle_gaps('left');
        if (test!==JSON.stringify(grid)) {
          generate_cell();
        }
      break;
  }
  win_lose();
}

function win_lose() {
  for(let i=0;i<16;i++) {
    if (grid[i].value===2048) {
      document.removeEventListener('keydown',handle_keydown);
      document.querySelector('.game-won').style.transform='translateY(0)';
      return;
    }
  }
  if (grid.some(cell => cell.value === 0)) {
    return;
  }

  if (moves_available()) {
    return;
  }
  
  document.removeEventListener('keydown', handle_keydown);
  document.querySelector('.game-over').style.transform = 'translateY(0)';
}

function moves_available() {
  for (let i = 0; i < 15; i++) {
    if (i % 4 !== 3 && grid[i].value === grid[i + 1].value) {
      return true;
    }
    if (i < 12 && grid[i].value === grid[i + 4].value) {
      return true;
    }
  }
  return false;
}

function merge(direction) {
  for (let m = 0; m < 4; m++) {
    for (let i = 0; i < 3; i++) {
      const current = getCellIndex(m, i, direction);
      const next = getCellIndex(m, i + 1, direction);
      if (grid[current].value === grid[next].value) {
        grid[current].value += grid[next].value;
        grid[next].value = 0;
        display_cell(current + 1, grid[current].value);
        display_cell(next + 1, 0);
      }
    }
  }
}

function getCellIndex(row, col, direction) {
  switch (direction) {
    case 'up':
      return col * 4 + row;
    case 'down':
      return (3 - col) * 4 + row;
    case 'left':
      return row * 4 + col;
    case 'right':
      return row * 4 + (3 - col);
  }
}


function handle_gaps(directions) {
   switch (directions) {
    case 'up':
       for(let m=0;m<4;m++) {
        if (grid[m+8].value===0) {
          grid[m+8].value=grid[m+12].value;
          grid[m+12].value=0;
          display_cell(m+8+1,grid[m+8].value);
          display_cell(m+12+1,0);
        }
         if (grid[m+4].value===0) {
          grid[m+4].value=grid[m+8].value;
          grid[m+8].value=grid[m+12].value;
          grid[m+12].value=0;
          display_cell(m+4+1,grid[m+4].value);
          display_cell(m+8+1,grid[m+8].value);
          display_cell(m+12+1,0);
        }
        if (grid[m].value===0) {
          grid[m].value=grid[m+4].value;
          grid[m+4].value=grid[m+8].value;
          grid[m+8].value=grid[m+12].value;
          grid[m+12].value=0;
          display_cell(m+1,grid[m].value);
          display_cell(m+4+1,grid[m+4].value);
          display_cell(m+8+1,grid[m+8].value);
          display_cell(m+12+1,0);
        }
       }
      break;

    case 'down':
      for(let m=0;m<4;m++) {
          if (grid[m+4].value===0) {
            grid[m+4].value=grid[m].value;
            grid[m].value=0;
            display_cell(m+4+1,grid[m+4].value);
            display_cell(m+1,0);
          }
          if (grid[m+8].value===0) {
            grid[m+8].value=grid[m+4].value;
            grid[m+4].value=grid[m].value;
            grid[m].value=0;
            display_cell(m+8+1,grid[m+8].value);
            display_cell(m+4+1,grid[m+4].value);
            display_cell(m+1,0);
          }
          if (grid[m+12].value===0) {
            grid[m+12].value=grid[m+8].value;
            grid[m+8].value=grid[m+4].value;
            grid[m+4].value=grid[m].value;
            grid[m].value=0;
            display_cell(m+12+1,grid[m+12].value);
            display_cell(m+8+1,grid[m+8].value);
            display_cell(m+4+1,grid[m+4].value);
            display_cell(m+1,0);
          }
       }
      break;

    case 'right':
        for(let m=0;m<13;m+=4) {
          if (grid[m+1].value===0) {
            grid[m+1].value=grid[m].value;
            grid[m].value=0;
            display_cell(m+1+1,grid[m+1].value);
            display_cell(m+1,0);
          }
          if (grid[m+2].value===0) {
            grid[m+2].value=grid[m+1].value;
            grid[m+1].value=grid[m].value;
            grid[m].value=0;
            display_cell(m+2+1,grid[m+2].value);
            display_cell(m+1+1,grid[m+1].value);
            display_cell(m+1,0);
          }
          if (grid[m+3].value===0) {
            grid[m+3].value=grid[m+2].value;
            grid[m+2].value=grid[m+1].value;
            grid[m+1].value=grid[m].value;
            grid[m].value=0;
            display_cell(m+3+1,grid[m+3].value);
            display_cell(m+2+1,grid[m+2].value);
            display_cell(m+1+1,grid[m+1].value);
            display_cell(m+1,0);
          }
      }
      break;

    case 'left':
        for(let m=0;m<13;m+=4) {
          if (grid[m+2].value===0) {
            grid[m+2].value=grid[m+3].value;
            grid[m+3].value=0;
            display_cell(m+2+1,grid[m+2].value);
            display_cell(m+3,0);
          }
          if (grid[m+1].value===0) {
            grid[m+1].value=grid[m+2].value;
            grid[m+2].value=grid[m+3].value;
            grid[m+3].value=0;
            display_cell(m+1+1,grid[m+1].value);
            display_cell(m+2+1,grid[m+2].value);
            display_cell(m+3+1,0);
          }
          if (grid[m].value===0) {
            grid[m].value=grid[m+1].value;
            grid[m+1].value=grid[m+2].value;
            grid[m+2].value=grid[m+3].value;
            grid[m+3].value=0;
            display_cell(m+1,grid[m].value);
            display_cell(m+1+1,grid[m+1].value);
            display_cell(m+2+1,grid[m+2].value);
            display_cell(m+3+1,0);
          }
      }
      break;
  }
}