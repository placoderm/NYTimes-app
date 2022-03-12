export default function addNewItemToList(listArea, item, fresh, index) {
  let desFacet = "";
  const newNode = document.createElement("div");
  newNode.classList.add(`item`);
  newNode.classList.add(item.section.replace(/\./g, "").replace(/ /g, ""));
  if (fresh) newNode.classList.add("fresh");
  // if there are des_facet, collect theim in desFacet
  if (item.des_facet) {
    item.des_facet.forEach(topic => {
      desFacet += `<span class="topic">${topic}</span>`;
    });
  }
  let thumbnailUrl = "";
  //   console.log("url " + item.multimedia[0].url);
  if (item.multimedia) {
    thumbnailUrl = `<img class="thumb" src="${item.multimedia[0].url}">`;
  }
  newNode.innerHTML = `${thumbnailUrl}
  <h2 class="title"><a href=" ${item.url}"> <span class="section">#${index + 1} ${item.section}</span> ${
    item.title
  }</a> </h2>
      <div class="abstract">${item.abstract}</div>
      <div class="topic-list">${desFacet}</div>
      <div class="first_published_date">${new Date(item.first_published_date)}</div>
    `;
  list.insertBefore(newNode, listArea.children[0]);
}
