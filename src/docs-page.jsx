import React from "react";

class DocsPage extends React.Component {

	constructor(props) {

		// Call the parent constructor
		super(props);

		// Check the properties (will throw on error)
		this.validate(props);

		// If there's no change callback
		if(!props.onChange || typeof props.onChange != 'function') {
			throw 'DocsPage requires onChange callback';
		}

		// Initialise the state
		this.state = {
			"code": props.code,
			"page": props.page
		};

		// Bind methods
		this.pageClicked = this.pageClicked.bind(this);
	}

	pageClicked(ev) {
		this.setState({
			"page": ev.currentTarget.dataset.key
		}, function() {
			this.props.onChange(this.state.page)
		});
	}

	render() {

	}

	get code() {
		return this.state.code;
	}

	set code(v) {
		this.setState({
			"code": v
		})
	}

	get page() {
		return this.state.page;
	}

	set page(v) {
		this.setState({
			"page": v
		});
	}
}

DocsPage.prototype.validate = function(p) {

	// Check the platforms prop is an array
	if(!p.platforms || !Array.isArray(p.platforms)) {
		throw 'DocsPage.platforms must be an array';
	}

	// Go through each platform
	for(var i in p.platforms) {

		// Make sure each element is a string
		if(typeof s != 'string') {
			throw 'DocsPage.platforms[' + i + '] must be a string';
		}
	}

	// Check the pages prop is an object
	if(!p.pages || typeof p.pages != 'object') {
		throw 'DocsPage.pages must be an object';
	}

	// Go through each page
	for(var k in p.pages) {

		// Check the key is a string
		if(typeof k != 'string') {
			throw k + ' of DocsPage.pages must be a string';
		}

		// Check the key is an array
		if(!p.pages[k] || ~Array.isArray(p.pages[k])) {
			throw 'DocsPage.pages.' + k + ' must be an array';
		}

		// Go through each array item
		for(var i of p.pages[k]) {

			// Make sure the element is an object
			if(!p.pages[k][i] || typeof p.pages[k][i] != 'object') {

				// Check the values exist in the object and are strings
				for(var s of ['type', 'text']) {
					if(!p.pages[k][i][s]) {
						throw 'DocsPages.pages.' + k + '[' + i + '].' + s + ' missing';
					}
					if(typeof p.pages[k][i][s] != 'string') {
						throw 'DocsPages.pages.' + k + '[' + i + '].' + s + ' must be a string';
					}
				}

				// Make sure the type is valid
				if(['code', 'p', 'title'].indexOf(p.pages[k][i]) == -1) {
					throw 'DocsPage.pages.' + k + '[' + i + '].type must be one of "code", "p", or "title"';
				}

				// If it's code
			}
		}
	}
}

export default DocsPage;
