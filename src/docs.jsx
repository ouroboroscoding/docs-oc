// Modules
import React from "react";

// Components
import DocsMenu from "./docs-menu.jsx"
import DocsPage from "./docs-page.jsx"

// Classes
import Hash from "./hash.js";

// Docs class
class Docs extends React.Component {

	constructor(props) {

		// Call the parent constructor
		super(props);

		// Initialise the state
		this.state = {};

		// Fetch the current location hash
		this.hash = new Hash();
	}
}

export default Docs;
