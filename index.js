import FetchWrapper from "./FetchWrapper.js";
import addNewItemToScreenList from "./addNewItemToScreenList.js";
import clearLocalStorage from "./clearLocalStorage.js";
import sectionFilter from "./sectionFilter.js";

sectionFilter();
clearLocalStorage(); // insert button and functionality
const API = new FetchWrapper("https://api.nytimes.com/svc/news/v3/content/");

const listArea = document.getElementById("list");
const loadButton = document.getElementById("load-button");
loadButton.addEventListener("click", () => {
  fetchStories();
});

// initialize storyArchive
let storyArchive = [];
if (localStorage.storyArchive) {
  storyArchive = JSON.parse(localStorage.storyArchive);
}

// adds entire storyArchive to screen
function renderStoriesToScreen(data) {
  data.forEach((item, index) => {
    addNewItemToScreenList(listArea, item, false, index);
  });
}

function fetchStories() {
  const spinner = document.getElementById("spinner");
  spinner.innerHTML = "<img height='50px' src='./images/Blocks-1.8s-70px.gif'>";

  API.get(`all/all.json?api-key=fovzB1AyADilOLnCGciTBNkpGVTSpmLC`).then(data => {
    // this will only happen when there was nothing in localStorage
    if (storyArchive.length === 0) {
      storyArchive = JSON.parse(JSON.stringify(data.results));
      storyArchive.reverse();
    }
    // this will only happen on first loading the app
    if (listArea.childNodes.length === 0) {
      renderStoriesToScreen(storyArchive);
    }

    const sA0 = new Date(storyArchive[storyArchive.length - 1].first_published_date);
    for (let i = data.results.length - 1; i > -1; i--) {
      if (new Date(data.results[i].first_published_date).getTime() > sA0.getTime()) {
        storyArchive.push(data.results[i]);
        addNewItemToScreenList(listArea, data.results[i], true, storyArchive.length - 1);
      }
    }

    // put storyArchive in localStorage
    localStorage.storyArchive = JSON.stringify(storyArchive);
    spinner.innerHTML = "";
  });
}
