
// Initialize extension data on install
browser.runtime.onInstalled.addListener(() => {
  console.log("Umrah Companion has been installed");
  
  // Initialize storage with default values if needed
  browser.storage.local.get('initialized', (result) => {
    if (!result.initialized) {
      browser.storage.local.set({
        initialized: true,
        bookmarks: [],
        recentPhrases: [],
        savedPhrases: [],
        preferences: {
          prayerMethod: 'umm_al_qura',
          language: 'en'
        }
      });
    }
  });
});

// Listen for messages from the popup or content scripts
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getPrayerTimes') {
    // Implement prayer time fetching
    sendResponse({ success: true });
  } else if (message.action === 'saveBookmark') {
    // Handle bookmark saving
    let bookmark = message.data;
    browser.storage.local.get('bookmarks', (result) => {
      let bookmarks = result.bookmarks || [];
      bookmarks.push(bookmark);
      browser.storage.local.set({ bookmarks });
      sendResponse({ success: true });
    });
    return true; // Required for async response
  }
});
