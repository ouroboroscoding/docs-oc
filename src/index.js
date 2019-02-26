// Libraries
var React = require("react");
var ReactDOM = require("react-dom");

// Primary component
var Docs = require("./docs.jsx")

// Export
module.exports = {
	"run": function(id, data, initial) {
		ReactDOM.render(
			React.createElement(Docs, {
				"data": data,
				"page": initial.page,
				"platform": initial.platform
			}),
			document.getElementById(id)
		);
	}
}
