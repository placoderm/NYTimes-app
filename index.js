import FetchWrapper from "./FetchWrapper.js";
import addNewItemToScreenList from "./addNewItemToScreenList.js";
import clearLocalStorage from "./clearLocalStorage.js";
import sectionFilter from "./sectionFilter.js";
import sectionsSetting from "./sectionsSetting.js";

sectionFilter(); // adds section filter
clearLocalStorage(); // insert button and functionality. does not clear automatically
const API = new FetchWrapper("https://api.nytimes.com/svc/news/v3/content/");

const loadTime = document.getElementById("load-time");

const listArea = document.getElementById("list");
const loadButton = document.getElementById("load-button");
loadButton.addEventListener("click", () => {
  fetchStories();
});

const settingsButton = document.getElementById("settings-button");
const settingsAres = document.getElementById("settings-areas");
settingsButton.addEventListener("click", () => {
  settingsAres.classList.toggle("settings-closed");
});

settingsButton.addEventListener("click", e => {
  if (e.ctrlKey) {
    console.log(JSON.parse(localStorage.storyArchive));
    settingsAres.classList.toggle("settings-closed");
  }
});
const allButton = document.getElementById("all-button");
const noneButton = document.getElementById("none-button");
const invertButton = document.getElementById("invert-button");

allButton.addEventListener("click", () => {
  let sectionList = JSON.parse(localStorage.sectionsList);
  Object.keys(sectionList).forEach(section => {
    sectionList[section] = true;
  });
  localStorage.sectionsList = JSON.stringify(sectionList);

  const sectionCheckBoxes = document.querySelectorAll(".section-check-box");
  sectionCheckBoxes.forEach(sectionCheckBox => {
    sectionCheckBox.checked = true;
  });
});

noneButton.addEventListener("click", () => {
  let sectionList = JSON.parse(localStorage.sectionsList);
  Object.keys(sectionList).forEach(section => {
    sectionList[section] = false;
  });
  localStorage.sectionsList = JSON.stringify(sectionList);

  const sectionCheckBoxes = document.querySelectorAll(".section-check-box");
  sectionCheckBoxes.forEach(sectionCheckBox => {
    sectionCheckBox.checked = false;
  });
});

invertButton.addEventListener("click", () => {
  let sectionList = JSON.parse(localStorage.sectionsList);
  Object.keys(sectionList).forEach(section => {
    sectionList[section] ? (sectionList[section] = false) : (sectionList[section] = true);
  });
  localStorage.sectionsList = JSON.stringify(sectionList);

  const sectionCheckBoxes = document.querySelectorAll(".section-check-box");
  sectionCheckBoxes.forEach(sectionCheckBox => {
    sectionCheckBox.checked ? (sectionCheckBox.checked = false) : (sectionCheckBox.checked = true);
  });
});

const sectionSettingsArea = document.getElementById("section-settings-area");
sectionsSetting(sectionSettingsArea); // builds settings section

const exclusionInput = document.getElementById("exclusion");
const highlightInput = document.getElementById("highlight");
if (localStorage.exclusionList === undefined) {
  localStorage.exclusionList = "";
}
if (localStorage.highlightList === undefined) {
  localStorage.highlightList = "";
}
// exclusionInput.value = localStorage.exclusionList;
// highlightInput.value = localStorage.highlightList;
// exclusionInput.addEventListener("input", e => {
//   localStorage.exclusionList = e.currentTarget.value;
// });
// highlightInput.addEventListener("input", e => {
//   localStorage.highlightList = e.currentTarget.value;
// });

// adds entire storyArchive to screen
function renderStoriesToScreen(data) {
  data.forEach((item, index) => {
    addNewItemToScreenList(listArea, item, false, index);
  });
}

// initialize storyArchive
let storyArchive = [];
if (localStorage.storyArchive) {
  storyArchive = JSON.parse(localStorage.storyArchive);
  renderStoriesToScreen(storyArchive);
}

function removeFresh() {
  const storyNodes = document.querySelectorAll(".item");
  storyNodes.forEach(node => {
    node.classList.remove("fresh");
  });
}

// THE FETCHING
function fetchStories() {
  removeFresh();
  const spinner = document.getElementById("spinner");
  spinner.innerHTML = "<img height='30px' src='./images/Blocks-1.8s-70px.gif'>";

  // https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=fovzB1AyADilOLnCGciTBNkpGVTSpmLC
  API.get(`all/all.json?api-key=fovzB1AyADilOLnCGciTBNkpGVTSpmLC&limit=100`).then(data => {
    loadTime.innerHTML = `Last checked on ${new Date().toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: "true",
    })}`;
    // this will only happen when there was nothing in localStorage
    if (storyArchive.length === 0) {
      data.results.forEach(result => {
        const x = JSON.parse(localStorage.sectionsList);
        if (x[result.section]) {
          storyArchive.push(result);
        }
      });

      localStorage.storyArchive = JSON.stringify(storyArchive);
    }
    // this will only happen on first loading the app
    if (listArea.childNodes.length === 0) {
      renderStoriesToScreen(storyArchive);
      localStorage.timeChecking = new Date().getTime();
    } else {
      const timeChecking = localStorage.timeChecking;
      console.log("👇🏻time from localStorage");
      console.log(timeChecking);
      console.log(new Date().getTime());
      for (let i = data.results.length - 1; i > -1; i--) {
        if (new Date(data.results[i].first_published_date).getTime() > timeChecking) {
          storyArchive.push(data.results[i]);
          addNewItemToScreenList(listArea, data.results[i], true, storyArchive.length - 1);
        }
      }
      localStorage.timeChecking = new Date().getTime();
    }

    // put storyArchive in localStorage
    localStorage.storyArchive = JSON.stringify(storyArchive);
    spinner.innerHTML = "";
  });
}

const toTop = document.getElementById("to-top");
toTop.addEventListener("click", () => {
  window.scrollTo(0, 0);
});
