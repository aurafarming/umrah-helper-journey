
// Handle button clicks
document.getElementById('open-app').addEventListener('click', () => {
  browser.tabs.create({ url: browser.runtime.getURL("index.html") });
});

document.getElementById('prayer-times').addEventListener('click', () => {
  browser.tabs.create({ url: browser.runtime.getURL("index.html?tab=prayer-times") });
});

document.getElementById('phrases').addEventListener('click', () => {
  browser.tabs.create({ url: browser.runtime.getURL("index.html?tab=phrases") });
});

document.getElementById('weather').addEventListener('click', () => {
  browser.tabs.create({ url: browser.runtime.getURL("index.html?tab=weather") });
});

document.getElementById('bookmarks').addEventListener('click', () => {
  browser.tabs.create({ url: browser.runtime.getURL("index.html?tab=bookmarks") });
});
