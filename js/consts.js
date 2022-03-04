// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDauvlATIBUH_mW2wNP8M9yZAbhPGu04iw",
  authDomain: "foodie-bc8f8.firebaseapp.com",
  projectId: "foodie-bc8f8",
  storageBucket: "foodie-bc8f8.appspot.com",
  messagingSenderId: "1010651326871",
  appId: "1:1010651326871:web:d8275d5087e6c16324fcd2",
};

const menu = `
          <nav>
            <div>
              <a href='index.html' id="logo">Foodie</a>
            </div>
            <div class="menu-items">
              <a href='index.html'>Home</a>
              <a href='recipes.html'>Recipes</a>
              <a href='about.html'>About</a>
              <a id="menu-search">Search</a>
            </div>
            <div id="search" class="fade">
              <input placeholder="Search" id="recipe-search-input" />
            </div>
          </nav>
      `;

const loggedInMenu = `
      <nav>
        <div>
          <a href='index.html' id="logo">Foodie</a>
        </div>
        <div class="menu-items">
          <a href='index.html'>Home</a>
          <a href='recipes.html'>Recipes</a>
          <a href='about.html'>About</a>
          <a id="logout">Log out</a>
        </div>
      </nav>
  `;

const mobileMenu = `
      <nav class='mobile-nav'>
        <div>
          <a href='index.html' id="logo">Foodie</a>
        </div>
        <button class="hamburger hamburger--collapse" type="button" id="hamburger">
          <span class="hamburger-box">
            <span class="hamburger-inner">
            </span>
          </span>
        </button>
        <div id="menu-items-mobile">
            <a href='index.html'>Home</a>
            <a href='recipes.html'>Recipes</a>
            <a href='about.html'>About</a>
        </div>
      </nav>
`;

const loggedMobileMenu = `
      <nav class='mobile-nav'>
        <div>
          <a href='index.html' id="logo">Foodie</a>
        </div>
        <button class="hamburger hamburger--collapse" type="button" id="hamburger">
          <span class="hamburger-box">
            <span class="hamburger-inner">
            </span>
          </span>
        </button>
        <div id="menu-items-mobile">
            <a href='index.html'>Home</a>
            <a href='recipes.html'>Recipes</a>
            <a href='about.html'>About</a>
            <a id="logout">Log out</a>
        </div>
      </nav>
`;

const footer = `        <svg
  viewBox="0 0 500 150"
  preserveAspectRatio="none"
  style="height: 100%; width: 100%"
  >
    <path
      d="M0.00,49.98 C233.35,-59.69 220.37,217.61 503.10,91.30 L500.00,150.00 L0.00,150.00 Z"
      style="stroke: none; fill: #edece8"
    ></path>
  </svg>
  </div>
    <div class="footer-logo">
    <h3>Foodie</h3>
  <h5>2022</h5>
</div>`;

const detectMenu = function (navId, adminMenu) {
  if (window.innerWidth <= 767) {
    if (!adminMenu) {
      document.getElementById(navId).innerHTML = mobileMenu;
    } else {
      document.getElementById(navId).innerHTML = loggedMobileMenu;
    }
  } else {
    if (!adminMenu) {
      document.getElementById(navId).innerHTML = menu;
      const search = document.getElementById("search");
      const menuSearch = document.getElementById("menu-search");
      const recipeSearchInput = document.getElementById("recipe-search-input");
      menuSearch.addEventListener("click", function (e) {
        search.classList.toggle('fade');
        //search.classList.toggle('none');
      });
      recipeSearchInput.addEventListener("keyup", function(e) {
        if (e.keyCode === 13) {
          e.preventDefault();
          sessionStorage.setItem("searchedItem", recipeSearchInput.value);
          location.assign("file:///Users/hanna-liisavilms/Desktop/foodie/recipes.html");
        }
      });
    } else {
      document.getElementById(navId).innerHTML = loggedInMenu;
    }
  }
};
const toggleMenuClass = function (hamburger, menu) {
  hamburger.classList.toggle("is-active");
  menu.classList.toggle("is-active");
};
const handleMenu = function (hamburgerId, menuId) {
  if (window.innerWidth <= 767) {
    hamburgerId.addEventListener("click", function () {
      toggleMenuClass(hamburgerId, menuId);
    });
  }
};

const completedMobileMenu = function (footerId, navId, adminMenu) {
  document.getElementById(footerId).innerHTML = footer;
  window.addEventListener("resize", function (e) {
    detectMenu(navId, adminMenu);
    const hamburgerId = document.getElementById("hamburger");
    const menuId = document.getElementById("menu-items-mobile");
    handleMenu(hamburgerId, menuId);
  });
  detectMenu(navId, adminMenu);

  const hamburgerId = document.getElementById("hamburger");
  const menuId = document.getElementById("menu-items-mobile");
  handleMenu(hamburgerId, menuId);
};

