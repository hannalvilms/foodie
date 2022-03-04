completedMobileMenu("register-footer", "register-header", false);

function register(create, auth, set, ref, database) {
  let email = document.getElementById("sign-up-email").value;
  let password = document.getElementById("sign-up-password").value;
  create(auth, email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      set(ref(database, "users/" + user.uid), {
        email: email,
      });
      alert("User created");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      alert(errorMessage);
    });
}
