let photos = "";
const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: "dbwdsy3t8",
    uploadPreset: "d3csb6jk",
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      photos = result.info.secure_url;
      console.log("Done! Here is the image info: ", result.info);
    }
  }
);

const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#recipe-name").value.trim();
  const cook_Time = document.querySelector("#recipe-cook_time").value.trim();
  const directions = document.querySelector("#recipe-directions").value.trim();
  const rest_Time = document.querySelector("#recipe-rest_time").value.trim();
  const prep_Time = document.querySelector("#recipe-prep_time").value.trim();
  const serves = document.querySelector("#recipe-serves").value.trim();
  const ingredients = document.querySelector("#recipe-ingredients").value.trim();
  const fat = document.querySelector("#recipe-fat").value.trim();
  const carbs = document.querySelector("#recipe-carbs").value.trim();
  const protein = document.querySelector("#recipe-protein").value.trim();
  const sugar = document.querySelector("#recipe-sugar").value.trim();
  const sodium = document.querySelector("#recipe-sodium").value.trim();
  const calories = document.querySelector("#recipe-calories").value.trim();

  if (name) {
    const response = await fetch(`/api/recipes`, {
      method: "POST",
      body: JSON.stringify({
        name,
        prep_Time,
        cook_Time,
        rest_Time,
        directions,
        photos,
        serves,
        ingredients,
        // graph
        fat,
        carbs,
        protein,
        sugar,
        sodium,
        calories
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to create recipe");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/recipes/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to delete recipe");
    }
  }
};

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
myChart.defaults.global.defaultFontColor = "#000";

document.getElementById("upload_widget").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);

document
  .querySelector(".new-recipe-form")
  .addEventListener("submit", newFormHandler);

// document
//   .querySelector(".recipe-list")
//   .addEventListener("click", delButtonHandler);
