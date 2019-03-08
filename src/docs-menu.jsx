// Import modules
var React = require("react");

// Create DocsMenu class and export it
class DocsMenu extends React.Component {

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
	}

	render() {
		var self = this;
		return (
			<ul className="menuSections">{this.props.data.map(function(sec, i) {
				return (
					<li key={i}>
						<span>{sec.title}</span>
						<ul className="menuPages">
							{sec.items.map(function(item, y) {
								return (
									<li key={y} className={self.state.page == item.key ? 'selected' : ''}>
										<a data-key={item.key} href={"#platform=" + self.state.platform + "&page=" + item.key}>{item.title}</a>
									</li>
								);
							})}
						</ul>
					</li>
				);
			})}</ul>
		);
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

DocsMenu.prototype.validate = function(p) {

	// Make sure keys are unique
	var keys = [];

	// Check the data prop is an array
	if(!p.data || !Array.isArray(p.data)) {
		throw 'DocsMenu.data must be an array';
	}

	// Loop through each data
	for(var i = 0; i < p.data.length; ++i) {

		// Check the element is an object
		if(!p.data[i] || typeof p.data[i] != 'object') {
			throw 'DocsMenu.data[' + i + '] must be an object';
		}

		// Check the values exist in the object
		for(var s of ['title', 'items']) {
			if(!p.data[i][s]) {
				throw 'DocsMenu.data[' + i + '].' + s + ' missing';
			}
		}

		// Check the section title is a string
		if(typeof p.data[i].title != 'string') {
			throw 'DocsMenu.data[' + i + '].title must be an string';
		}

		// Check the section items is an array
		if(!Array.isArray(p.data[i].items)) {
			throw 'DocsMenu.data[' + i + '].items must be an array';
		}

		// Loop through each item of the current section
		for(var y = 0; y < p.data[i].items.length; ++y) {

			// Check the element is an object
			if(!p.data[i].items[y] || typeof p.data[i].items[y] != 'object') {
				throw 'DocsMenu.data[' + i + '].items[' + y + '] must be an object';
			}

			// Check the values exist in the object
			for(var s of ['title', 'key']) {
				if(!p.data[i].items[y][s]) {
					throw 'DocsMenu.data[' + i + '].items[' + y + '].' + s + ' missing';
				}
				if(typeof p.data[i].items[y][s] != 'string') {
					throw 'DocsMenu.data[' + i + '].items[' + y + '].' + s + ' not a string';
				}
			}

			// Check the key is unique
			if(keys.indexOf(p.data[i].items[y].key) == -1) {
				keys.push(p.data[i].items[y].key);
			} else {
				throw 'DocsMenu.data[' + i + '].items[' + y + '].key (' + p.data[i].items[y].key + ') already used';
			}
		}
	}
}

module.exports = DocsMenu;
