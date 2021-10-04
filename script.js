const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
];

// Store the list items
const listItems = [];

let dragStartIndex;

/* // the sort function explanation
const numbers = [1, 3, 110, 10, 40, 302];
console.log(
  // 'a' and 'b' are options for comparison
  numbers.sort((a, b) => {
    return a - b;
  })
); */

createList();

// Insert listItems into DOM
function createList() {
  [...richestPeople]
    .map((i) => ({ value: i, random: Math.random() }))
    .sort((a, b) => a.random - b.random)
    .map((i) => i.value)
    .forEach((i, idx) => {
      console.log(i);
      const listItem = document.createElement('li');

      listItem.setAttribute('data-index', idx); //this way we can add an attribute to the element. The first word is always data- the second is whatever

      listItem.innerHTML = `
    <span class="number">${idx + 1}</span>
    <div class="draggable" draggable="true">
      <p class="person-name">${i}</p>
      <i class="fas fa-grip-lines"></i>
    </div>
    `;

      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  /* console.log('start'); */
  dragStartIndex = +this.closest('li').getAttribute('data-index'); // this gets the li elements index and the '+' sign makes the whole thing a Number
  console.log(dragStartIndex);
}

function dragEnter() {
  /* console.log('enter'); */
  this.classList.add('enter');
}

function dragOver(e) {
  /* console.log('over'); */
  e.preventDefault();
}

function dragLeave() {
  /* console.log('leave'); */
  this.classList.remove('over');
}

function dragDrop() {
  /* console.log('drop'); */
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
  checkOder();
}

// swap listitems that are drag&drop
function swapItems(fromIdx, toIdx) {
  const itemOne = listItems[fromIdx].querySelector('.draggable');
  const itemTwo = listItems[toIdx].querySelector('.draggable');

  const temp = itemOne.innerHTML;
  itemOne.innerHTML = itemTwo.innerHTML;
  itemTwo.innerHTML = temp;
}

// check the order of list items
function checkOder() {
  listItems.forEach((i, idx) => {
    const personName = i.querySelector('.person-name').innerText;
    if (personName === richestPeople[idx]) {
      i.classList.remove('wrong');
      i.classList.add('right');
    } else {
      i.classList.remove('right');
      i.classList.add('wrong');
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((i) => {
    i.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach((i) => {
    i.addEventListener('dragover', dragOver);
    i.addEventListener('drop', dragDrop);
    i.addEventListener('dragenter', dragEnter);
    i.addEventListener('dragleave', dragLeave);
  });
}

check.addEventListener('click', checkOder);
