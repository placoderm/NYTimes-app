import addNewItemToScreenList from "./addNewItemToScreenList.js";

export default function sectionsSetting(sectionSettingsArea) {
  const sections = [
    "Admin",
    "Arts",
    "Automobiles",
    "Books",
    "Briefing",
    "Business",
    "Climate",
    "Corrections",
    "Crosswords & Games",
    "Education",
    "En Español",
    "Fashion",
    "Food",
    "Guides",
    "Health",
    "Home & Garden",
    "Home Page",
    "Job Market",
    "Lens",
    "Magazine",
    "Movies",
    "Multimedia/Photos",
    "New York",
    "Obituaries",
    "Opinion",
    "Parenting",
    "Podcasts",
    "Reader Center",
    "Real Estate",
    "Science",
    "Smarter Living",
    "Sports",
    "Style",
    "Sunday Review",
    "T Brand",
    "T Magazine",
    "Technology",
    "The Learning Network",
    "The Upshot",
    "The Weekly",
    "Theater",
    "Times Insider",
    "Today’s Paper",
    "Travel",
    "U.S.",
    "Universal",
    "Video",
    "Well",
    "World",
    "Your Money",
  ];
  let sectionsList = {};

  if (localStorage.sectionsList) {
    sectionsList = JSON.parse(localStorage.sectionsList);
  } else {
    // build sectionsList and save it to local storage
    sections.forEach(section => {
      sectionsList[section] = true;
    });
    localStorage.sectionsList = JSON.stringify(sectionsList);
  }

  let html = "";

  sections.forEach(section => {
    html += `<label>
    <input class="section-check-box" value="${section}" id="${section.replace(/[\. &//]/g, "")}" type="checkbox" ${
      JSON.parse(localStorage.sectionsList)[section] ? `checked` : ``
    }><span class="check-icon"></span>
    ${section}
  </label>`;
  });

  sectionSettingsArea.innerHTML = html;

  const sectionCheckBoxes = document.querySelectorAll(".section-check-box");
  sectionCheckBoxes.forEach(sectionCheckBox => {
    sectionCheckBox.addEventListener("click", e => {
      let x = JSON.parse(localStorage.sectionsList);
      x[e.target.value] = e.target.checked;
      localStorage.sectionsList = JSON.stringify(x);
    });
  });

  const filterItems = document.getElementById("filter-items");
  filterItems.addEventListener("click", () => {
    if (confirm("Are you sure you want to remove the stories in sections that are no longer checked?")) {
      let storyArchive = JSON.parse(localStorage.storyArchive);
      storyArchive = storyArchive.filter(item => {
        let x = JSON.parse(localStorage.sectionsList);
        return x[item.section];
      });
      localStorage.storyArchive = JSON.stringify(storyArchive);
      const listArea = document.getElementById("list");
      listArea.innerHTML = "";
      storyArchive.forEach((item, index) => {
        addNewItemToScreenList(listArea, item, false, index);
      });
    }
  });

  return null;
}
