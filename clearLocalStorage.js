export default function clearLocalStorage() {
  const clearLocalStorageButton = document.getElementById("clear-localStorage");
  clearLocalStorageButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to erase the local storage?")) {
      localStorage.storyArchive = "";
      localStorage.timeCheckinge = "";
      clearLocalStorageButton.innerText = "History Cleared!";
      setTimeout(() => {
        clearLocalStorageButton.innerText = "Clear History";
      }, 1000);
    }
  });
}
