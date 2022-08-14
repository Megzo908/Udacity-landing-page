mybutton = document.getElementById("myBtn")

const menu = document.getElementById("navbar__list")
const sections = document.querySelectorAll("section")

window.onscroll = () => {
  scrollFunction()
}

buildMenuBar()

const burger = document.querySelector("svg")
const nav = document.querySelector(".page__header")
burger.addEventListener("click", () => {
  nav.classList.toggle("hidden")
})

//scroll to top button
function scrollFunction() {
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
    mybutton.style.display = "block"
  } else {
    mybutton.style.display = "none"
  }
}
//scroll to the top
function topFunction() {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

//The main function on the page, build the navbar dynamically from section names, adds active class to the nav links according to the section visible on the screen and makes the sections collapsible
function buildMenuBar() {
  let navList = document.createElement("li")

  sections.forEach(section => {
    const secid = section.getAttribute("id")
    const secDataNav = section.getAttribute("data-nav")

    //builds navbar
    navList.innerHTML += `<a href='#${secid}' class='menu__link' data-nav=${secDataNav}>${secDataNav}</a>`
    menu.append(navList)

    //adds and removes active class from the section based on the output of the isInViewport function
    window.addEventListener("scroll", () => {
      if (isInViewport(section)) {
        section.classList.add("your-active-class")
        addActiveClass(secid)
      } else if (section.classList.contains("your-active-class")) {
        section.classList.remove("your-active-class")
        removeActiveClass(secid)
      }
    })
    //section collapsing
    section.addEventListener("click", () => {
      const content = section.querySelector(".content")
      const h2 = section.querySelector("h2")
      section.classList.toggle("hidden")
      h2.classList.toggle("active")
      if (!section.classList.contains("hidden")) {
        content.style.maxHeight = content.scrollHeight + "px"
      } else {
        content.style.maxHeight = content.scrollHeight + "px"
        setTimeout(() => {
          content.style.maxHeight = 0
        }, 50)
      }
    })
  })
}

function addActiveClass(id) {
  const menuLinks = document.querySelectorAll(".menu__link")
  const current = document.querySelector(`[href='#${id}']`)
  menuLinks.forEach(link => {
    link.classList.remove("active")
    current.classList.add("active")
  })
}

function removeActiveClass(id) {
  const menuLinks = document.querySelectorAll(".menu__link")
  const current = document.querySelector(`[href='#${id}']`)
  menuLinks.forEach(link => {
    link.classList.remove("active")
    current.classList.remove("active")
  })
}
//checks if the element is visible to the user or not(used in the buildMenuBar using section as the parameter)
function isInViewport(element) {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
