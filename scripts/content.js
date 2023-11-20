function BlockSite() {
    //alert("This URL is completely blocked for today. This tab will close after you press OK")
    // Open a new document
    var newDocument = document.open("text/html", "replace");
    // Write the new HTML to the document
    newDocument.write(`
    <html>
        <head>
        <title>Blocked Website</title>
        <style>
            body {
                margin: auto;
                background-image: radial-gradient(circle, orange, red, purple);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100vh;
                text-align: center;
            }
            img {
                display: block;
                margin: auto;
            }
            div {

            }
        </style>
        </head>
        <body>
            <div>
                <h1>GET OFF THIS SITE</h1>
                <img src="${chrome.runtime.getURL('images/gigamad.png')}" alt="Blocked Website" width="500" height="500">
            </div>
        </body>
    </html>
    `);

    // Close the document
    newDocument.close();
 }
 

chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.from === "background" && message.subject === "block") {
        BlockSite()
    }
})

chrome.storage.local.get("BlockedUrls", (data) => {
    if (data.BlockedUrls !== undefined) {
        if (data.BlockedUrls.some((e) => e.url === window.location.hostname && e.status === "BLOCKED")) {
            BlockSite()
        }
    }
})
