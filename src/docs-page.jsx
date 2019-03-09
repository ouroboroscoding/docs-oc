// Import modules
var React = require('react');
var ReactMarkdown = require('react-markdown');

// Create DocsPage class and export it
class DocsPage extends React.Component {

	constructor(props) {

		// Call the parent constructor
		super(props);

		// Check the properties (will throw on error)
		this.validate(props);

		// Initialise the state
		this.state = {
			"page": props.page,
			"platform": props.platform
		};

		// Bind methods
		this.processSection = this.processSection.bind(this);
	}

	processSection(x) {

		// Get the right text based on platform
		var s = '';

		// If the section is a string, return as is
		if(typeof x == 'string') {
			s = x;
		}

		// Else if we have an object
		if(typeof x == 'object') {

			// Do we have a section for the current platform?
			if(x[this.state.platform]) {
				s = x[this.state.platform];
			}

			// Else do we have a default
			else if(x['_']) {
				s = x['_'];
			}

			// Else, return an error message
			else {
				s = 'NO TEXT FOUND FOR "' + this.state.platform + '"';
			}
		}

		// Replace |PLATFORM| for links
		s = s.split('|PLATFORM|').join(this.state.platform);

		// Process any links or special characters and return
		return s;
	}

	render() {
		// Store this
		var self = this;

		// Check the page exist
		if(typeof this.props.data[this.state.page] != 'undefined') {

			// Store page details
			var page = this.props.data[this.state.page];

			// Render page
			return (
				<div className="page">
					<h2 className="title">{page.title}</h2>
					<ul className="platforms">{this.props.platforms.map(function(p, i) {
						return (
							<li key={i} className={self.state.platform == p.key ? 'selected' : ''}>
								<a href={"#platform=" + p.key + "&page=" + self.state.page} data-key={p.key} onClick={self.platformClicked}>{p.title}</a>
							</li>
						);
					})}</ul>
					<div className="sections">
						{page.sections.map(function(o, i) {
							if(o.type == 'code') {
								return <pre key={i}><code className={o.code ? o.code : self.state.platform}>{self.processSection(o.text)}</code></pre>
							} else if(o.type == 'markdown') {
								return <ReactMarkdown key={i} source={self.processSection(o.text)} />
							} else if(o.type == 'paragraph') {
								return <p key={i}>{self.processSection(o.text)}</p>
							} else if(o.type == 'pre') {
								return <pre key={i}>{self.processSection(o.text)}</pre>
							} else if(o.type == 'title') {
								return <h3 key={i}>{self.processSection(o.text)}</h3>
							}
						})}
					</div>
					{page.pagination &&
						<div className="pagination">
							{page.pagination.prev &&
								<div className="prevPage">
									<a href={"#platform=" + self.state.platform + "&page=" + page.pagination.prev} data-key={page.pagination.prev} onClick={self.pageClicked}>{self.props.data[page.pagination.prev].title}</a>
								</div>
							}
							{page.pagination.next &&
								<div className="nextPage">
									<a href={"#platform=" + self.state.platform + "&page=" + page.pagination.next} data-key={page.pagination.next} onClick={self.pageClicked}>{self.props.data[page.pagination.next].title}</a>
								</div>
							}
						</div>
					}
				</div>
			);
		}

		// Page not found
		else {
			return (
				<div className="missing">Page does not exist</div>
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

	// Check the data prop is an object
	if(!p.data || typeof p.data != 'object') {
		throw 'DocsPage.data must be an object';
	}

	// Go through each page
	for(var k in p.data) {

		// Check the key is a string
		if(typeof k != 'string') {
			throw k + ' of DocsPage.data must be a string';
		}

		// Check the value is an array
		if(!p.data[k] || typeof p.data[k] != 'object') {
			throw 'DocsPage.data.' + k + ' must be an object';
		}

		// Check the values exist in the object
		for(var s of ['sections', 'title']) {

			// Check the values exist in the object
			if(!p.data[k][s]) {
				throw 'DocsPages.data.' + k + '.' + s + ' is missing';
			}

			// Make sure the title is a string
			if(typeof p.data[k].title != 'string') {
				throw 'DocsPages.data.' + k + '.title must be a string';
			}

			// Make sure the sections is an array
			if(!p.data[k]['sections'] || !Array.isArray(p.data[k].sections)) {
				throw 'DocsPages.data.' + k + '.sections must be an array';
			}

			// Go through each section
			for(var i in p.data[k].sections) {

				// Check the values exist in the object
				for(var s of ['type', 'text']) {
					if(!p.data[k].sections[i][s]) {
						throw 'DocsPages.data.' + k + '.sections[' + i + '].' + s + ' is missing';
					}
				}

				// Make sure the type is valid
				if(['code', 'markdown', 'paragraph', 'pre', 'title'].indexOf(p.data[k].sections[i].type) == -1) {
					throw 'DocsPage.data.' + k + '.sections[' + i + '].type must be one of "code", "paragraph", or "title"';
				}

				// Make sure we have either a string or an object
				if(['string', 'object'].indexOf(typeof p.data[k].sections[i].text) == -1) {
					throw 'DocsPage.data.' + k + '.sections[' + i + '].text must be a "string" or an "object"';
				}
			}
		}

		// If there's a pagination key
		if('pagination' in p.data[k]) {

			// Make sure it's an object
			if(typeof p.data[k].pagination != 'object') {
				throw 'DocsPage.data.' + k + '.pagination must be an object';
			}

			// Go through each key
			for(var k2 in p.data[k].pagination) {

				// Make sure the key is valid
				if(['next', 'prev'].indexOf(k2) == -1) {
					throw k2 + ' in DocsPage.data.' + k + '.pagination must be one of "prev" or "next"';
				}

				// Make sure it exists in the list of pages
				if(!p.data[p.data[k].pagination[k2]]) {
					throw 'DocsPage.data.' + k + '.pagination.' + k2 + ' not a valid page';
				}
			}
		}
	}
}

module.exports = DocsPage;
