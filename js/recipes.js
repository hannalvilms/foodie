completedMobileMenu("all-recipes-footer", "all-recipes-header", false);

//refrences
let results = document.getElementById("searched-recipes-list");
let removeSearch = document.getElementById("remove-search");
let recipeSearch = document.getElementById("recipe-search");
function allRecipes(snapshot, search_term) {
  let recipes = [];
  snapshot.docs.forEach((doc) => {
    recipes.push({ ...doc.data(), id: doc.id });
  });

  if (sessionStorage.getItem("searchedItem")) {
    removeSearch.classList.remove("none");
    removeSearch.classList.add("shown");

    recipeSearch.value = sessionStorage.getItem("searchedItem");
    showList(recipes, sessionStorage.getItem("searchedItem").toLowerCase());
    removeSearch.addEventListener("click", function (e) {
        removeSearch.classList.remove("shown");
        removeSearch.classList.add("none");
        recipeSearch.value = "";
        sessionStorage.removeItem("searchedItem");
        showList(recipes, search_term.toLowerCase());
      });
  } else {
    showList(recipes, search_term.toLowerCase());
  }
  redirect(recipes);
}

const showList = (recipes, term) => {
  results.innerHTML = "";
  recipes
    .filter((item) => {
      return item.title.toLowerCase().includes(term);
    })
    .forEach((e) => {
      const div = document.createElement("div");
      div.classList.add(
        "recipe",
        "rec-fade",
        "col-lg-4",
        "col-md-4",
        "col-sm-6",
        "col-xs-12"
      );
      div.innerHTML = `
            <img
                src=${e.imageURL}
                alt=${e.title}
            />
        <h3>${e.title}</h3></div>
          `;
      results.appendChild(div);
    });
};

function redirect(recipes) {
  for (let i = 0; i < document.querySelectorAll(".recipe").length; i++) {
    document.querySelectorAll(".recipe")[i].onclick = function () {
      sessionStorage.setItem("imageUrl", recipes[i].imageURL);
      sessionStorage.setItem("title", recipes[i].title);
      sessionStorage.setItem("ingredients", recipes[i].ingredients);
      sessionStorage.setItem("description", recipes[i].description);
      window.open("recipe.html");
    };
  }
}

