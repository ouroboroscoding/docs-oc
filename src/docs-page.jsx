import React from "react";

class DocsPage extends React.Component {

	constructor(props) {

		// Call the parent constructor
		super(props);

		// Check the properties (will throw on error)
		this.validate(props);

		// If there's no page callback
		if(!props.onPage || typeof props.onPage != 'function') {
			throw 'DocsPage requires onPage callback';
		}

		// If there's no platform callback
		if(!props.onPlatform || typeof props.onPlatform != 'function') {
			throw 'DocsPage requires onPlatform callback';
		}

		// Initialise the state
		this.state = {
			"page": props.page,
			"platform": props.platform
		};

		// Bind methods
		this.pageClicked = this.pageClicked.bind(this);
		this.platformClicked = this.platformClicked.bind(this);
	}

	pageClicked(ev) {
		this.setState({
			"page": ev.currentTarget.dataset.key
		}, function() {
			this.props.onPage(this.state.page)
		});
	}

	platformClicked(ev) {
		this.setState({
			"platform": ev.currentTarget.dataset.key
		}, function() {
			this.props.onPlatform(this.state.platform)
		});
	}

	render() {
		// Store this
		var self = this;

		// Check the page exist
		if(typeof this.props.pages[this.state.page] != 'undefined') {

			// Store page details
			var page = this.props.pages[this.state.page];

			// Render page
			return (
				<React.Fragment>
					<h1>{page.title}</h1>
					<ul class="platforms">{this.props.platforms.map(function(p, i) {
						return (
							<li data-key={p.key}>{p.title}</li>
						);
					})}</ul>
					<div class="page">
						{page.sections.map(function(o, i) {
							if(o.type == 'code') {
								return <pre>{o.text[self.state.platform]}</pre>
							} else if(o.type == 'paragraph') {
								return <p>{o.text}</p>;
							} else if(o.type == 'title') {
								return <h2>{o.text}</h2>
							}
						})}
					</div>
				</React.Fragment>
			);
		}

		// Page not found
		else {
			return (
				<div class="missing">Page does not exist</div>
			);
		}
	}

	get platform() {
		return this.state.platform;
	}

	set platform(v) {
		this.setState({
			"platform": v
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

		// Make sure the value is an object
		if(typeof p.platforms[i] != 'object') {
			throw 'DocsPage.platforms[' + i + '] must be an object';
		}

		// Make sure the object has a key and a title, and that both are strings
		for(var s of ['key', 'title']) {
			if(!p.platforms[i][s]) {
				throw 'DocsPage.platforms[' + i + '].' + s + ' is missing';
			}
			if(typeof p.platforms[i][s] != 'string') {
				throw 'DocsPage.platforms[' + i + '].' + s + ' must be a string';
			}
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

		// Check the value is an array
		if(!p.pages[k] || !Array.isArray(p.pages[k])) {
			throw 'DocsPage.pages.' + k + ' must be an array';
		}

		// Go through each element of the array
		for(var i in p.pages[k]) {

			// Make sure the element is an object
			if(!p.pages[k][i] || typeof p.pages[k][i] != 'object') {

				// Check the values exist in the object
				for(var s of ['sections', 'title']) {

					// Check the values exist in the object
					if(!p.pages[k][i][s]) {
						throw 'DocsPages.pages.' + k + '[' + i + '].' + s + ' is missing';
					}

					// Make sure the title is a string
					if(typeof p.pages[k][i].title != 'string') {
						throw 'DocsPages.pages.' + k + '[' + i + '].title must be a string';
					}

					// Make sure the sections is an array
					if(!p.pages[k][i]['title'] || !Array.isArray(p.pages[k][i].title)) {
						throw 'DocsPages.pages.' + k + '[' + i + '].sections must be an array';
					}

					// Go through each section
					for(var i2 in p.pages[k][i].sections) {

						// Check the values exist in the object
						for(var s of ['type', 'text']) {
							if(!p.pages[k][i].sections[i2][s]) {
								throw 'DocsPages.pages.' + k + '[' + i + '].sections[' + i2 + '].' + s + ' is missing';
							}
						}

						// Make sure the type is valid
						if(['code', 'paragraph', 'title'].indexOf(p.pages[k][i].sections[i2].type) == -1) {
							throw 'DocsPage.pages.' + k + '[' + i + '].sections[' + i2 + '].type must be one of "code", "paragraph", or "title"';
						}

						// If the type is code
						if(p.pages[k][i].sections[i2].type == 'code') {

							// Make sure the text is an object
							if(typeof p.pages[k][i].sections[i2].text != 'object') {

								// Make sure the key and value are strings
								for(var k2 in p.pages[k][i].text) {
									if(typeof k2 != 'string') {
										throw k2 + ' in DocsPage.pages.' + k + '[' + i + '].sections[' + i2 + '].text must be a string';
									}
									if(typeof p.pages[k][i].text[k2] != 'string') {
										throw 'DocsPage.pages.' + k + '[' + i + '].sections[' + i2 + '].text[' + k2 + '] must be a string';
									}
								}
							}
						}

						// Else validate it's text
						else if(typeof p.pages[k][i].sections[i2].text != 'string') {
							throw 'DocsPage.pages.' + k + '[' + i + '].sections[' + i2 + '].text must be a tring for type of "' + p.pages[k][i].sections[i2].type +  '"';
						}
					}
				}
			}
		}
	}
}

export default DocsPage;
