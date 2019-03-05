// Libraries
var React = require("react");
var ReactDOM = require("react-dom");

// Primary component
var Docs = require("./docs.jsx")

// Export
module.exports = {
	"run": function(id, data, initial, callback) {

		// Init the attributes
		var attrs = {
			"data": data,
			"page": initial.page,
			"platform": initial.platform
		};

		// If there's a change callback
		if(callback) {
			attrs.onChange = callback
		}

		ReactDOM.render(
			React.createElement(Docs, attrs),
			document.getElementById(id)
		);
	}
}
