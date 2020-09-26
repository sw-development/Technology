// DOM
const navBtn = document.querySelector(".nav-btn");
const navClose = document.querySelector(".nav-list__item--close");
const nav = document.querySelector(".nav-list");
const collapseBtn = document.querySelectorAll(".collapse__item-btn");
const projectsWrapper = document.querySelector(".projects__wrapper");
const projectsNavLinks = document.querySelectorAll(".projects-list__link");
const blogBtn = document.querySelector(".blog__btn");
const blogWrapper = document.querySelector(".blog__wrapper");

// Navigation
navBtn.addEventListener("click", e => {
  e.preventDefault();
  nav.classList.toggle("nav-list--active");
});
navClose.addEventListener("click", e => {
  e.preventDefault();
  nav.classList.remove("nav-list--active");
});

// This function opens and shows content of About section

collapseBtn.forEach(btn => {
  btn.addEventListener("click", e => {
    const content = e.target.parentElement.nextElementSibling;
    content.classList.toggle("collapse__item-content--active");
    if (content.classList.contains("collapse__item-content--active")) {
      e.target.textContent = "keyboard_arrow_down";
    } else {
      e.target.textContent = "keyboard_arrow_right";
    }
  });
});

const cardsRender = (item, wrapper) => {
  wrapper.innerHTML += `
  <div class="card">
  <div class="card__picture-wrapper">
    <img src=${item.picture} class="card__picture">
  </div>
  <div class="card__content">
    <h5 class="card__title">${item.title}</h5>
    ${
      item.category
        ? `<p class="description card__description">${item.category}</p>`
        : ""
    }
    ${item.date ? `<span class="blog__card-date">15 November, 2019</span>` : ""}
    ${
      item.description
        ? `<p class="description card__description">As the minuteness of the parts formed a great hindrance.</p>`
        : ""
    }
  </div>
  </div>
  `;
};

// Rendering projects
Projects.forEach(project => cardsRender(project, projectsWrapper));

// Projects menu
projectsNavLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const ActiveLink = [...projectsNavLinks].filter(link =>
      link.classList.value.includes("projects-list__link--active")
    );
    ActiveLink[0].classList = "projects-list__link";
    link.classList.add("projects-list__link--active");

    let filteredProjects;
    if (e.target.textContent == "All") filteredProjects = Projects;
    else {
      filteredProjects = Projects.filter(
        project => project.category == e.target.textContent
      );
    }
    projectsWrapper.innerHTML = "";
    filteredProjects.forEach(project => cardsRender(project, projectsWrapper));
  });
});

// Rendering Blog posts
Posts.forEach((post, index) => {
  if (index < 3) cardsRender(post, blogWrapper);
});

// Load more Blog posts
blogBtn.addEventListener("click", e => {
  e.preventDefault();
  blogWrapper.innerHTML = "";
  Posts.forEach(post => cardsRender(post, blogWrapper));
});
