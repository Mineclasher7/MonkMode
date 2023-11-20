var WebsiteUrl;
var WebsiteHostName;
let isBlocked = false;

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    WebsiteUrl = tabs[0].url
    WebsiteHostName = new URL(tabs[0].url).hostname

document.getElementById("url").innerText = WebsiteHostName
})

function ShowError(text) {
    var div = document.createElement('div');
    div.setAttribute('id', 'ERRORcontainer');
    div.innerHTML = `
        <div class="ERROR">
            <p>${text}</p>    
        </div>`
    document.getElementsByClassName("bottomItem")[0].appendChild(div)

    setTimeout(() => {
        document.getElementById("ERRORcontainer").remove()
    }, 3000)
    }

    document.getElementById("btn").addEventListener("click", () => {
        if (WebsiteUrl.toLowerCase().includes("chrome://")) {
            ShowError("You cannot block a chrome URL")
        }
    else {
        // Send a message to the background script
        chrome.runtime.sendMessage({
            from: "popup",
            subject: "toggleBlock",
            url: WebsiteHostName
        });
        isBlocked = !isBlocked
        // Update the button text
        document.getElementById("btn").innerText = isBlocked ? "UNBLOCK THIS URL" : "BLOCK THIS URL";

    }
});

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        WebsiteUrl = tabs[0].url
        WebsiteHostName = new URL(tabs[0].url).hostname

        document.getElementById("url").innerText = WebsiteHostName

        chrome.storage.local.get("BlockedUrls", (data) => {
        BlockedUrls = data.BlockedUrls || [];
        isBlocked = BlockedUrls.some((e) => e.url === WebsiteHostName && e.status === "BLOCKED");
        // Update the button text
        document.getElementById("btn").innerText = isBlocked ? "UNBLOCK THIS URL" : "BLOCK THIS URL";
    });
});