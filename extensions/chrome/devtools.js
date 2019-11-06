console.log('test dev');
chrome.devtools.panels.create("My Panel",
    null,
    "panel.html",
    function(panel) {
        console.log('eeeeee');
        // code invoked on panel creation
    }
);