completedMobileMenu("all-recipes-footer", "all-recipes-header", false);

//refrences
let results = document.getElementById("searched-recipes-list");
function allRecipes(snapshot, search_term) {
  let recipes = [];
  snapshot.docs.forEach((doc) => {
    recipes.push({ ...doc.data(), id: doc.id });
  });

  if (sessionStorage.getItem("searchedItem")) {
    document.getElementById("remove-search").classList.remove("none");
    document.getElementById("remove-search").classList.add("shown");

    document.getElementById("recipe-search").value =
      sessionStorage.getItem("searchedItem");
    console.log(sessionStorage.getItem("searchedItem"));
    showList(recipes, sessionStorage.getItem("searchedItem").toLowerCase());
    document
      .getElementById("remove-search")
      .addEventListener("click", function (e) {
        document.getElementById("remove-search").classList.remove("shown");
        document.getElementById("remove-search").classList.add("none");
        document.getElementById("recipe-search").value = "";
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

