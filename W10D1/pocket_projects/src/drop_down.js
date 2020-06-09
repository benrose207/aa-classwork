
const dogs = {
  "Corgi": "https://www.akc.org/dog-breeds/cardigan-welsh-corgi/",
  "Australian Shepherd": "https://www.akc.org/dog-breeds/australian-shepherd/",
  "Affenpinscher": "https://www.akc.org/dog-breeds/affenpinscher/",
  "American Staffordshire Terrier": "https://www.akc.org/dog-breeds/american-staffordshire-terrier/",
  "Tosa": "https://www.akc.org/dog-breeds/tosa/",
  "Labrador Retriever": "https://www.akc.org/dog-breeds/labrador-retriever/",
  "French Bulldog": "https://www.akc.org/dog-breeds/french-bulldog/" 
};

function dogLinkCreator () {
  const dogLinks = [];

  Object.keys(dogs).forEach(name => {
    const link = document.createElement("a");
    link.innerHTML = name;
    link.href = dogs[name];
    
    const li = document.createElement("li");
    li.classList.add("dog-link");
    li.classList.add("hidden");
    li.append(link);
    dogLinks.push(li);
  });

  return dogLinks;
}

function attachDogLinks () {
  const dogLinks = dogLinkCreator();
  const ul = document.querySelector(".drop-down-dog-list");
  dogLinks.forEach(link => ul.append(link));
}

attachDogLinks();

const links = Array.from(document.querySelectorAll(".dog-link"));

function handleEnter (event) {
  links.forEach(link => link.classList.remove("hidden"));
}

function handleLeave (event) {
  links.forEach(link => link.classList.add("hidden"));
}

const dogNav = document.querySelector(".drop-down-dog-nav")
dogNav.addEventListener("mouseenter", handleEnter);
dogNav.addEventListener("mouseleave", handleLeave);