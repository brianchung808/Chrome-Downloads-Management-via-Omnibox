// holds key:value pair of filename:download_id
var downloads = [];


/* Listener for input change.
*/
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {

	/* When input changes, search downloads
	 */
	chrome.downloads.search({query: [text]}, function(results) {
		suggestions = [];
		for(var i = 0; i < results.length; i++) {
			var filename = results[i].filename;

			if(filename) {
				suggestions.push({content: filename, description: filename});
			}

			downloads[filename] = results[i].id;
		}


		if(suggestions.length > 0) {
			suggest(suggestions);
		}
	});
});

/* Listener for input being submitted.
*/
chrome.omnibox.onInputEntered.addListener(function(text) {
	// when user enters input, open the file.
	// TODO -> Add option for delete
	chrome.downloads.open(downloads[text]);
});
