export default function sectionFilter() {
  const sections = [
    "World",
    "Podcasts",
    "Sports",
    "Business",
    "Gameplay",
    "US",
    "Science",
    "Corrections",
    "Books",
    "Style",
    "Technology",
    "Today’sPaper",
  ];
  const headerRow2 = document.getElementById("header-row-2");

  // function makeButtons(sections) {
  let html = "";
  sections.forEach(section => {
    html += `<button class="filter-buttons" id="${section}">${section}</button>\n`;
  });
  headerRow2.innerHTML = html;

  const filterButtons = document.querySelectorAll(".filter-buttons");
  // console.log(filterButtons);
  filterButtons.forEach(button => {
    button.addEventListener("click", e => {
      console.log(e.currentTarget.id);
      const thisButton = document.getElementById(e.currentTarget.id);
      thisButton.classList.toggle("disabled");
      const sectionItems = document.querySelectorAll("." + e.currentTarget.id);
      //console.log(sectionItems);
      sectionItems.forEach(item => {
        //console.log(item);
        item.classList.toggle("section-hidden");
      });
    });
  });
}
// }
