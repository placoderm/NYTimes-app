// parameters:
// listArea -> the node to add to
// item => item object to add
// fresh -> boolean true if new
// index -> index of item in storyArchive array

export default function addNewItemToScreenList(listArea, item, fresh, index) {
  if (item.section === "Sports" || item.section === "en Español") {
    return;
  }
  let desFacet = "";
  const newNode = document.createElement("div");
  newNode.classList.add(`item`);
  newNode.classList.add(item.section.replace(/\./g, "").replace(/ /g, ""));
  if (fresh) newNode.classList.add("fresh");

  // if there are des_facet, collect theim in desFacet
  if (item.des_facet) {
    item.des_facet.forEach(topic => {
      desFacet += `<span class="topic">${topic.replace(" and ", " & ")}</span>`;
    });
  }

  // build the thumbnail
  let thumbnailUrl = "";
  if (item.multimedia) {
    thumbnailUrl = `<div class="placeholder">
    <div class="thumb" style="background-image: url(${item.multimedia[0].url})"><img /></div>
</div>`;
  }

  // build the date
  const formattedDate = new Date(item.first_published_date).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: "true",
  });

  // Here is where the final output is built
  newNode.innerHTML = `<a href=" ${item.url}">${thumbnailUrl}
  <h2 class="title"> <span class="section">${item.section}</span> ${item.title} </h2>
      <div class="abstract">${item.abstract}</div>
      <div class="topic-list">${desFacet} <span class="first_published_date">${formattedDate}</span></div>
      </a>
    `;
  list.insertBefore(newNode, listArea.children[0]);
}
