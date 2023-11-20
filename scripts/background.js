chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.from === "popup" && request.subject === "toggleBlock") {
    chrome.storage.local.get("BlockedUrls", (data) => {
        let BlockedUrls = data.BlockedUrls || [];
        let method = "block"
        var index = BlockedUrls.findIndex((e) => e.url === request.url)
        if (index == -1) {
            BlockedUrls.push({ status: "BLOCKED", url: request.url })
        }
        else {
            BlockedUrls.splice(index, 1)
            method = "unblock"
        }
        chrome.storage.local.set({ BlockedUrls: BlockedUrls }, () => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (method == "block") {
                    chrome.tabs.sendMessage(tabs[0].id, {from: "background", subject: "block"} );
                }
                if (method == "unblock") {
                    chrome.tabs.reload(tabs[0].id);
                }
            });
        });
    })
    }
});

