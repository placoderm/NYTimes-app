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
  const headerRow2 = document.getElementById("header-row-2");

  // function makeButtons(sections) {
  let html = "";
  sections.forEach(section => {
    const sectionStripped = section.replace(/\./g, "").replace(/ /g, "");
    html += `<button class="filter-buttons" id="${sectionStripped}">${section}</button>\n`;
  });
  headerRow2.innerHTML = html;

  const filterButtons = document.querySelectorAll(".filter-buttons");

  filterButtons.forEach(button => {
    button.addEventListener("click", e => {
      const thisButton = document.getElementById(e.currentTarget.id);
      thisButton.classList.toggle("disabled");
      const sectionItems = document.querySelectorAll("." + e.currentTarget.id);
      sectionItems.forEach(item => {
        item.classList.toggle("section-hidden");
      });
    });
  });
}
// }
