import React from "react";

class DocsMenu extends React.Component {

	constructor(props) {

		// Call the parent constructor
		super(props);

		// Check the properties (will throw on error)
		this.validate(props);

		// If there's no page callback
		if(!props.onPage || typeof props.onPage != 'function') {
			throw 'DocsMenu requires onPage callback';
		}

		// Initialise the state
		this.state = {
			"page": props.page
		};

		// Bind methods
		this.pageClicked = this.pageClicked.bind(this);
	}

	pageClicked(ev) {
		this.setState({
			"page": ev.currentTarget.dataset.key
		}, function() {
			this.props.onPage(this.state.page);
		})
	}

	render() {
		var self = this;
		return (
			<ul>{this.props.sections.map(function(sec, i) {
				<li>
					<span>{sec.title}</span>
					<ul>
						{sec.pages.map(function(item, y) {
							<li data-key={item.key} class={self.state.selected == item.key ? 'selected' : ''} onClick={self.pageClicked}>{item.title}</li>
						})}
					</ul>
				</li>
			})}</ul>
		);
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

	// Check the sections prop is an array
	if(!p.sections || !Array.isArray(p.sections)) {
		throw 'DocsMenu.sections must be an array';
	}

	// Loop through each sections
	for(var i = 0; i < p.sections.length; ++i) {

		// Check the element is an object
		if(!p.sections[i] || typeof p.sections[i] != 'object') {
			throw 'DocsMenu.sections[' + i + '] must be an object';
		}

		// Check the values exist in the object
		for(var s of ['title', 'items']) {
			if(!p.sections[i][s]) {
				throw 'DocsMenu.sections[' + i + '].' + s + ' missing';
			}
		}

		// Check the section title is a string
		if(typeof p.sections[i].title != 'string') {
			throw 'DocsMenu.sections[' + i + '].title must be an string';
		}

		// Check the section items is an array
		if(!Array.isArray(p.sections[i].items)) {
			throw 'DocsMenu.sections[' + i + '].items must be an array';
		}

		// Loop through each item of the current section
		for(var y = 0; i < p.sections[i].items.length; ++y) {

			// Check the element is an object
			if(!p.sections[i].items[y] || typeof p.sections[i].items[y] != 'object') {
				throw 'DocsMenu.sections[' + i + '].items[' + y + '] must be an object';
			}

			// Check the values exist in the object
			for(var s of ['title', 'key']) {
				if(!p.sections[i].items[y][s]) {
					throw 'DocsMenu.sections[' + i + '].items[' + y + '].' + s + ' missing';
				}
				if(typeof p.sections[i].items[y][s] != 'string') {
					throw 'DocsMenu.sections[' + i + '].items[' + y + '].' + s + ' not a string';
				}
			}

			// Check the key is unique
			if(keys.indexOf(p.sections[i].items[y].key) == -1) {
				keys.push(p.sections[i].items[y].key);
			} else {
				throw 'DocsMenu.sections[' + i + '].items[' + y + '].key (' + p.sections[i].items[y].key + ') already used';
			}
		}
	}
}

export default DocsMenu;
