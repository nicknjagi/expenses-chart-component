const chart = document.querySelector(".chart");

async function createChart() {
  let expenses = await fetch("./data.json")
    .then((response) => response.json())
    .then(data => data.map(val => {
      return `
            <div>
              <div data-title="$${val.amount}" class="bar" style="height:${calcHeight(val.amount)}px"></div>
              <small>${val.day}</small>
            </div>
          `
    }));

  expenses = expenses.join("");
  chart.innerHTML = expenses;

  const bars = document.querySelectorAll(".bar");

  function removeActive() {
    bars.forEach(el => {
      el.classList.remove('active');
    })
  }

  bars.forEach(el => {
    el.addEventListener('click', (e) => {
      removeActive();
      e.target.classList.add('active');
    })
  })
}

createChart();

function calcHeight(amount) {
  const h = Math.floor((amount * 220) / 100);
  return h;
}

