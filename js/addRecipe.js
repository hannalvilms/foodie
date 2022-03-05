//refrences
let userEmail = sessionStorage.getItem("userEmail");
let title = document.getElementById("recipe-title");
let ingredients = document.getElementById("recipe-ingredients");
let description = document.getElementById("recipe-description");
let vegan = document.getElementById("recipe-vegan");
let glutenFree = document.getElementById("recipe-gluten-free");
let dairyFree = document.getElementById("recipe-dairy-free");
let lchf = document.getElementById("recipe-lchf");
let paleo = document.getElementById("recipe-paleo");
let selectImageButton = document.getElementById("recipe-select-image");
let namebox = document.getElementById("namebox");
let extlab = document.getElementById("extlab");
let myimg = document.getElementById("myimg");
let progresslabel = document.getElementById("progress");
let files = [];
let reader = new FileReader();

completedMobileMenu("add-recipe-footer", "add-recipe-header", true);

function GetExtensionName(file) {
  var temp = file.name.split(".");
  var ext = temp.slice(temp.length - 1, temp.length);
  return "." + ext[0];
}
function GetFileName(file) {
  var temp = file.name.split(".");
  var fname = temp.slice(0, -1).join(".");
  return fname;
}

if (userEmail != "hannaliisavilms@gmail.com") {
  location.assign("https://hannalvilms.github.io/foodie/index.html");
}

var input = document.createElement("input");
input.type = "file";
input.onchange = (e) => {
  files = e.target.files;
  var extention = GetExtensionName(files[0]);
  var name = GetFileName(files[0]);
  namebox.value = name
  extlab.innerHTML = extention
  reader.readAsDataURL(files[0]);
};

reader.onload = function () {
  myimg.src = reader.result;
};

//img popup
selectImageButton.addEventListener("click", function () {
  input.click();
});

//Add values to db
function valuesToDb(collection, db, addDoc, url) {
  var ref = collection(db, "recipes");
  var date = new Date();
  const docRef = addDoc(ref, {
    title: title.value,
    imageURL: url,
    ingredients: ingredients.value,
    description: description.value,
    vegan: vegan.checked,
    glutenFree: glutenFree.checked,
    dairyFree: dairyFree.checked,
    lchf: lchf.checked,
    paleo: paleo.checked,
    Added: date,
  })
    .then(() => {
      alert("data added");
      location.reload();
    })
    .catch((err) => {
      alert(err);
    });
}

//Upload image + show progress
function imageProgress(
  sRef,
  storage,
  getDownloadURL,
  uploadBytesResumable,
  AddDocument_AutoID
) {
  let ImgToUpload = files[0];
  let ImgName = namebox.value + extlab.innerHTML;
  const metaData = {
    contentType: ImgToUpload.type,
  };
  const storageRef = sRef(storage, "Images/" + ImgName);
  const UploadTask = uploadBytesResumable(storageRef, ImgToUpload, metaData);
  UploadTask.on(
    "state-changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progresslabel.innerHTML = "Upload " + progress + "%";
    },
    (error) => {
      alert(error);
    },
    () => {
      getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
        AddDocument_AutoID(downloadURL);
      });
    }
  );
}

//logout
function logOut(signOut, auth) {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      alert("logged out");
      location.assign(
        "https://hannalvilms.github.io/foodie/index.html"
      );
    })
    .catch((error) => {
      // An error happened
      alert(error.message);
    });
}
