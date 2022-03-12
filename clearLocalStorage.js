export default function clearLocalStorage() {
  const clearLocalStorageButton = document.getElementById("clear-localStorage");
  const clearLSMessage = document.getElementById("clear-lS-message");
  clearLocalStorageButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to erase the local storage?")) {
      localStorage.storyArchive = "";
      clearLSMessage.innerText = "Local storage cleared";
      setTimeout(() => {
        clearLSMessage.innerText = "";
      }, 1000);
    }
  });
}
