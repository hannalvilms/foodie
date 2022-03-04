completedMobileMenu('recipe-footer', 'recipe-header', false);
let imageURL = sessionStorage.getItem("imageUrl");
let title = sessionStorage.getItem("title");
let ingredients = sessionStorage.getItem("ingredients");
let description = sessionStorage.getItem("description");
document.getElementById("recipe-details").innerHTML = ` 
    <div class='recipe-img-title row'>
        <img src=${imageURL} class="col-lg-5 col-md-6 col-sm-12">
        <div class='recipe-title-ingredients col-lg-7 col-md-6 col-sm-12'>
            <h1>${title}</h1>
            <p>${ingredients}</p>
        </div>
    </div>
    <div class='recipe-description to-fade-in'>
        <h2>Description</h2>
        <p>${description}</p>
    </div>`;
