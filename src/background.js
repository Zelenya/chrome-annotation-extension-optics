// Set the global off-badge
chrome.action.setBadgeBackgroundColor(
  { color: 'coral' },
  () => { }
);

chrome.action.setBadgeText(
  { text: 'off' },
  () => { }
);

// Set the on-badge,
// run the annotate-script,
// disable the action, 
// and update the action hint
chrome.action.onClicked.addListener((tab) => {
  chrome.action.setBadgeBackgroundColor(
    {
      color: 'seagreen',
      tabId: tab.id
    },
    () => { }
  );

  chrome.action.setBadgeText({
    text: 'on',
    tabId: tab.id,
  }, () => { });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['dist/content.js']
  });

  chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: ['dist/content.css']
  }, () => { });

  chrome.action.disable(tab.id, () => { });

  chrome.action.setTitle(
    {
      title: 'Working. Reload to turn it off',
      tabId: tab.id,
    },
    () => { }
  );
});

