const getUsers = async () => {
  try {
    const results = await fetch("/data/users.json");
    const data = await results.json();
    const users = data.users;
    return users;
  } catch (err) {
    console.log(err);
  }
};

const getFarmers = async () => {
  try {
    const results = await fetch("http://localhost:3005/farmers");
    const data = await results.json();
    const products = data;
    return products;
  } catch (err) {
    console.log(err);
  }
};


/*
=============
Navigation
=============
 */
const navOpen = document.querySelector(".nav__hamburger");
const navClose = document.querySelector(".close__toggle");
const menu = document.querySelector(".nav__menu");
const scrollLink = document.querySelectorAll(".scroll-link");
const navContainer = document.querySelector(".nav__menu");

navOpen.addEventListener("click", () => {
  menu.classList.add("open");
  document.body.classList.add("active");
  navContainer.style.left = "0";
  navContainer.style.width = "30rem";
});

navClose.addEventListener("click", () => {
  menu.classList.remove("open");
  document.body.classList.remove("active");
  navContainer.style.left = "-30rem";
  navContainer.style.width = "0";
});

/*
=============
PopUp
=============
 */
const subscription = document.querySelector("#subscription");
const closePopup = document.querySelector("#subscription .popup__close");

const initialModal = document.querySelector("#initialModal");
const bookSlot =document.getElementById("bookSlot");
const loginBtn =document.getElementById("loginBtn");
if (subscription) {
  closePopup.addEventListener("click", () => {
    subscription.classList.add("hide__popup");
  });

  window.addEventListener("load", () => {
    setTimeout(() => {
      subscription.classList.remove("hide__popup");
    }, 500);
  });
}

if(initialModal){
  window.addEventListener("load",()=>{
    console.log("amar");
    initialModal.style.display = "block";
  })
}

/*
=============
Fixed Navigation
=============
 */

const navBar = document.querySelector(".navigation");
const gotoTop = document.querySelector(".goto-top");

// Smooth Scroll
Array.from(scrollLink).map((link) => {
  link.addEventListener("click", (e) => {
    // Prevent Default
    e.preventDefault();

    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    const navHeight = navBar.getBoundingClientRect().height;
    const fixNav = navBar.classList.contains("fix__nav");
    let position = element.offsetTop - navHeight;

    if (!fixNav) {
      position = position - navHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    navContainer.style.left = "-30rem";
    document.body.classList.remove("active");
  });
});

// Fix NavBar

window.addEventListener("scroll", (e) => {
  const scrollHeight = window.pageYOffset;
  const navHeight = navBar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navBar.classList.add("fix__nav");
  } else {
    navBar.classList.remove("fix__nav");
  }

  if (scrollHeight > 300) {
    gotoTop.classList.add("show-top");
  } else {
    gotoTop.classList.remove("show-top");
  }
});

const loginfunc = () => {
  const login = document.querySelector("#login");
  const closePopup = document.querySelector("#login .popup__close");

  if (login) {
    closePopup.addEventListener("click", () => {
      login.classList.add("hide__popup");
    });
    document.querySelector("#signupform").style.display = "none";
    document.querySelector("#signup").style.display = "block";
    login.classList.remove("hide__popup");
  }
};

const showSignUpForm = () => {
  document.querySelector("#signupform").style.display = "block";
  document.querySelector("#signup").style.display = "none";
};

const checkoutFunc = () => {
  document.querySelector("#checkout").style.display = "block";
};

const closecart = () => {
  document.querySelector("#cartpopup").classList.add("hide__popup");
  window.location.reload();
};

const cartpopup = document.querySelector("#cartpopup");
const closecartPopup = document.querySelector("#cartpopup .popup__close");

if (cartpopup) {
  closecartPopup.addEventListener("click", () => {
    cartpopup.classList.add("hide__popup");
  });
}
const userlogin = async () => {
  const users = await getUsers();
  const uName = document.getElementById("uName").value;
  const pWord = document.getElementById("pWord").value;
  let warn;
  let newAry = users.filter(
    (val) => val.username == uName && val.pass == pWord
  );
  console.log("new Art", newAry);
  if (newAry.length > 0) {
    document.getElementById("loggedInUser").innerText = newAry[0].username;
    document.querySelector("#login").classList.add("hide__popup");
  } else {
    document.getElementsByClassName("warn")[0].style.display = "block";
  }
};

document.getElementById("cancelBtn").addEventListener("click", () => {
  document.querySelector("#login").classList.add("hide__popup");
});

document.getElementById("saveBtn").addEventListener("click", () => {
  document.querySelector("#login").classList.add("hide__popup");
  document.getElementById("signupform").submit();
});


const consumerFunc =() => {
  initialModal.classList.add("hide__popup");
  bookSlot.classList.add("hide__popup");
}

const farmerFunc = () => {
  document.querySelector("#bookurslot").classList.remove("hide__farmer__form");
  document.querySelector("#savedFarmerDetail").classList.add("hide__farmer__form");
  document.querySelector("#farmerForm").classList.remove("hide__farmer__form");
  // document.querySelector(".farmerBtn").classList.add("hide__farmer__form");
}

const savefarmer=() => {
  document.querySelector("#savedFarmerDetail").classList.remove("hide__farmer__form");
  document.querySelector("#farmerForm").classList.add("hide__farmer__form");
  
  document.getElementById("loggedInUser").innerText = document.getElementById('farmerName').value;
}

// document.getElementById("subs").addEventListener("click", () => {
//   document.querySelector("#subscription").classList.add("hide__popup");
// });

const  farmerLogin = async () => {
  const users = await getFarmers();
  const uName = document.getElementById("farmername").value;
  const pWord = document.getElementById("farmerpass").value;
  let warn,newAry =[];
  console.log(users);

  
  Object.keys(users[0]).forEach(
        (val) => {
      console.log("val",users[0][val]);
      if (users[0][val].fname == uName && users[0][val].id == pWord){
        newAry.push(users[0][val])
      } }
  )

 
  console.log("new Art", newAry);
  if (newAry.length > 0) {
    document.getElementById("loggedInUser").innerText = newAry[0].fname;
    document.querySelector("#initialModal").classList.add("hide__popup");
    loginBtn.classList.add("hide__popup");
  } else {
    document.getElementsByClassName("warn1")[0].style.display = "block";
  }
}

const doneFunc = () => {
  document.querySelector("#bookurslot").classList.add("hide__farmer__form");
}
const closeRegisterForm = () => {
  document.querySelector("#bookurslot").classList.add("hide__farmer__form");
}