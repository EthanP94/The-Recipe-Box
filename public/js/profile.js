const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#recipe-name").value.trim();
  const prep_Time = document.querySelector("#prep_Time").value.trim();
  const description = document.querySelector("#food_desc").value.trim();
  const cool_Time = document.querySelector("#cool_time").value.trim();
  let photos = ""
  const myWidget = cloudinary.createUploadWidget({
    cloudName: process.env.CLOUDINARY_CLOUD_ID, 
    uploadPreset: 'my_preset'}, (error, result) => { 
      if (!error && result && result.event === "success") {
        photos = 
        console.log('Done! Here is the image info: ', result.info); 
      }
    }
  )

  if (name && prep_Time && description && cool_Time) {
    const response = await fetch(`/api/recipes`, {
      method: "POST",
      body: JSON.stringify({ name, prep_Time, description, cool_Time, }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
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
      document.location.replace("/profile");
    } else {
      alert("Failed to delete recipe");
    }
  }
};

document.getElementById("upload_widget").addEventListener("click", function(){
  myWidget.open();
}, false);

document
  .querySelector(".new-recipe-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".recipe-list")
  .addEventListener("click", delButtonHandler);
