const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

const myClassList = document.querySelectorAll('.container .row .seat');
console.log('myClassList:', myClassList);

var classList = Array.from(myClassList).filter((c) => c.className !== 'seat occupied');
console.log('classList:', classList);

// console.log('container:', container);
// console.log('seats:', seats);
// console.log('count:', count);
// console.log('total:', total);
// console.log('movieSelect:', movieSelect);

populateUI();
// Initial count and total set
//updateSelectedCount();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  console.log('seatsIndex:', seatsIndex);

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
  // console.log('e.target.classList:', e.target.classList);
  // console.log('Array.from(e.target.classList)', Array.from(e.target.classList).includes('occupied'));

  //if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied'))
  if (!Array.from(e.target.classList).includes('occupied')) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

//populateUI();
// Initial count and total set
updateSelectedCount();

//let ticketPrice = +movieSelect.value;
