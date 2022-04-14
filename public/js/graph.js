const macroArray = [...document.querySelectorAll("p[data-macro]")]

const newMacroArray = macroArray.map(node=> node.getAttribute("data-macro"))

const macroNameArray = [...document.querySelectorAll("p[data-macro]")]

const newMacroNameArray = macroNameArray.map(node=>node.textContent)

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: newMacroNameArray,
        datasets: [{
            label: '# of Votes',
            data: newMacroArray,
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      plugins: { 
      legend: {
        labels: {
          color: "black", 
          font: {
            size: 14
          }
        }
      }
    }
  } 
});