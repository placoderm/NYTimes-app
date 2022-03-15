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

  let html = "";

  sections.forEach(section => {
    html += `<label>
  <input class="section-check-box" id="${section.replace(
    /[\. &]/g,
    ""
  )}" type="checkbox" checked><span class="check-icon"></span>
  ${section}
</label>`;
  });

  sectionSettingsArea.innerHTML = html;

  console.log(html);
}
