export default function sectionFilter() {
  const sections = [
    "World",
    "U.S.",
    "New York",
    "Opinion",
    "Sports",
    "Podcasts",
    "Business",
    "Movies",
    "Science",
    "Books",
    "Style",
    "Arts",
    "Technology",
  ];

  function cleanSectionId(section) {
    return section.replace(/\./g, "").replace(/ /g, "");
  }

  const headerRow2 = document.getElementById("header-row-2");

  // function makeButtons(sections) {
  let html = "";
  sections.forEach(section => {
    const sectionStripped = cleanSectionId(section);
    html += `<button class="filter-buttons section-buttons" id="${sectionStripped}">${section}</button>\n`;
  });

  html += `<button  class="filter-buttons" id="all">All</button>`;
  html += `<button  class="filter-buttons" id="none">None</button>`;
  headerRow2.innerHTML = html;

  const sectionButtons = document.querySelectorAll(".section-buttons");

  sectionButtons.forEach(button => {
    button.addEventListener("click", e => {
      const thisButton = document.getElementById(e.currentTarget.id);
      thisButton.classList.toggle("disabled");
      const sectionItems = document.querySelectorAll("." + e.currentTarget.id);
      sectionItems.forEach(item => {
        item.classList.toggle("section-hidden");
      });
    });
  });

  const allButton = document.getElementById("all");
  const noneButton = document.getElementById("none");
  allButton.addEventListener("click", () => {
    // change button color of section buttons to green
    sectionButtons.forEach(button => {
      button.classList.remove("disabled");
    });
    // remove the section-hidden class
    const items = document.querySelectorAll(".item");
    items.forEach(item => {
      item.classList.remove("section-hidden");
    });
    // change this button value to "none"
  });

  noneButton.addEventListener("click", () => {
    // change button color of section buttons to gray
    sectionButtons.forEach(button => {
      button.classList.add("disabled");
    });
    // add the section-hidden class
    sections.forEach(section => {
      const sectionItems = document.querySelectorAll("." + cleanSectionId(section));
      sectionItems.forEach(item => {
        item.classList.add("section-hidden");
      });
    });
  });
}
