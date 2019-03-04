// Import modules
var React = require("react");

// Create DocsPage class and export it
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
								return <pre key={i} className={self.state.platform}>{o.text[self.state.platform]}</pre>
							} else if(o.type == 'paragraph') {
								return <p key={i}>{o.text}</p>
							} else if(o.type == 'pre') {
								return <pre key={i}>{o.text}</pre>
							} else if(o.type == 'title') {
								return <h3 key={i}>{o.text}</h3>
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
				if(['code', 'paragraph', 'pre', 'title'].indexOf(p.data[k].sections[i].type) == -1) {
					throw 'DocsPage.data.' + k + '.sections[' + i + '].type must be one of "code", "paragraph", or "title"';
				}

				// If the type is code
				if(p.data[k].sections[i].type == 'code') {

					// Make sure the text is an object
					if(typeof p.data[k].sections[i].text != 'object') {

						// Make sure the key and value are strings
						for(var k2 in p.data[k].text) {
							if(typeof k2 != 'string') {
								throw k2 + ' in DocsPage.data.' + k + '.sections[' + i + '].text must be a string';
							}
							if(typeof p.data[k].text[k2] != 'string') {
								throw 'DocsPage.data.' + k + '.sections[' + i + '].text[' + k2 + '] must be a string';
							}
						}
					}
				}

				// Else validate it's text
				else if(typeof p.data[k].sections[i].text != 'string') {
					throw 'DocsPage.data.' + k + '.sections[' + i + '].text must be a tring for type of "' + p.data[k].sections[i].type +  '"';
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
