// parameters:
// listArea -> the node to add to
// item => item object to add
// fresh -> boolean true if new
// index -> index of item in storyArchive array

export default function addNewItemToScreenList(listArea, item, fresh, index) {
  let x = JSON.parse(localStorage.sectionsList);

  if (!x[item.section]) {
    return;
  }
  let desFacet = "";
  const newNode = document.createElement("div");
  newNode.setAttribute("id", item.slug_name);
  newNode.classList.add(`item`);
  newNode.classList.add(item.section.replace(/[\. &]/g, ""));
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
  newNode.innerHTML = `<button value="${item.slug_name}" class="delete">×</button><a href=" ${item.url}">${thumbnailUrl}
  <h2 class="title">#${index + 1} <span class="section">${item.section}</span> ${item.title} </h2>
      <div class="abstract">${item.abstract}</div>
      <div class="topic-list">${desFacet} <span class="first_published_date">${formattedDate}</span></div>
      </a>
    `;

  // add higlight if there is a match
  const highlightTerms = localStorage.highlightList.toLowerCase().trim().replace(", ", ",").split(",");
  if (highlightTerms[0] != "") {
    if (highlightTerms.some(term => newNode.innerHTML.toLowerCase().includes(term))) {
      newNode.classList.add(`highlight`);
    }
  }

  list.insertBefore(newNode, listArea.children[0]);

  //delete buttons
  const deleteButton = document.getElementById(item.slug_name);
  deleteButton.addEventListener("click", e => {
    const deletedElement = document.getElementById(e.originalTarget.value);
    deletedElement.remove();
    let storyArchive = JSON.parse(localStorage.storyArchive);
    // remove current one from storyArchive
    for (let i = 0; i < storyArchive.length; i++) {
      if (storyArchive[i].slug_name === e.originalTarget.value) {
        storyArchive.splice(i, 1);
      }
    }

    localStorage.storyArchive = JSON.stringify(storyArchive);
  }); // end of event listener
}
