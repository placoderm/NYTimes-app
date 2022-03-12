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
  //console.log("just got data from local storage");
  storyArchive = JSON.parse(localStorage.storyArchive);
}

// adds entire storyArchive to screen
function renderStoriesToScreen(data) {
  // console.log("👇🏻 data passed to renderStoriesToScreen()  ");
  //console.log(data);
  data.forEach((item, index) => {
    addNewItemToScreenList(listArea, item, false, index);
  });
}

function fetchStories() {
  const spinner = document.getElementById("spinner");
  spinner.innerHTML = "<img height='50px' src='./images/Blocks-1.8s-70px.gif'>";

  API.get(`all/all.json?api-key=fovzB1AyADilOLnCGciTBNkpGVTSpmLC`).then(data => {
    //console.log("👇🏻 data.results from GET");
    //console.log(data.results);

    // this will only happen when there was nothing in localStorage
    //console.log("👇🏻 storyArchive.length");
    //console.log(storyArchive.length);
    if (storyArchive.length === 0) {
      //console.log("sA is empty");
      storyArchive = JSON.parse(JSON.stringify(data.results));
      storyArchive.reverse();
    }
    // this will only happen on first loading the app
    if (listArea.childNodes.length === 0) {
      //console.log("the screen was empty!!!");
      renderStoriesToScreen(storyArchive);
    }

    //console.log("👇🏻 this is storyArchive before comparing to data");
    //console.log(storyArchive);
    const sA0 = new Date(storyArchive[storyArchive.length - 1].first_published_date);
    //console.log("👇🏻 should be the last item in the storyArchive");
    //console.log(storyArchive[storyArchive.length - 1].title);
    //console.log(sA0);
    for (let i = data.results.length - 1; i > -1; i--) {
      //   console.log(i + " " + data.results[i].first_published_date);
      if (new Date(data.results[i].first_published_date).getTime() > sA0.getTime()) {
        //console.log("there are new items" + i);
        storyArchive.push(data.results[i]);
        addNewItemToScreenList(listArea, data.results[i], true, storyArchive.length - 1);
      }
    }
    //console.log(storyArchive);
    //console.log("loaded at " + new Date());
    // put storyArchive in localStorage
    localStorage.storyArchive = JSON.stringify(storyArchive);
    spinner.innerHTML = "";
  });
}
