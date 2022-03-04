completedMobileMenu("index-footer", "home-nav", false);

//refrences
let recentRecipes = document.getElementById("recent-recipes");

function recipesToPage(q, snapshot) {
  let recipes = [];
  snapshot.docs.forEach((doc) => {
    recipes.push({ ...doc.data(), id: doc.id });
  });

  for (let i = 0; i < recipes.length; i++) {
    recentRecipes.innerHTML += `<div class="recipe${i} recipe to-fade-in"></div>`;
  }

  for (let i = 0; i < document.querySelectorAll(".recipe").length; i++) {
    document.querySelectorAll(".recipe")[i].innerHTML += `
      <div>
          <img
              src=${recipes[i].imageURL}
              alt=${recipes[i].title}
          />
      <h3>${recipes[i].title}</h3>
      </div>`;
    document.querySelectorAll(".recipe")[i].onclick = function () {
      sessionStorage.setItem("imageUrl", recipes[i].imageURL);
      sessionStorage.setItem("title", recipes[i].title);
      sessionStorage.setItem("ingredients", recipes[i].ingredients);
      sessionStorage.setItem("description", recipes[i].description);
      window.open("recipe.html");
    };
  }

}
