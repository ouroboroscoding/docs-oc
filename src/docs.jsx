// Modules
var React = require("react");
var ReactDom = require("react-dom");

// Components
var DocsMenu = require("./docs-menu.jsx")
var DocsPage = require("./docs-page.jsx")

// Classes
var Hash = require("./hash.js");

// Docs class
class Docs extends React.Component {

	constructor(props) {

		// Call the parent constructor
		super(props);

		// Check for props
		if(!props.data) {
			throw "Docs requires a data property";
		}

		// Fetch the current location hash
		this.hash = new Hash(this.hashChange.bind(this));

		// Initialise the state
		this.state = {
			"page": this.hash.get('page') || props.page,
			"platform": this.hash.get('platform') || props.platform
		};
	}

	hashChange(hash) {
		this.setState({
			"page": hash.get('page', this.state.page),
			"platform": hash.get('platform', this.state.platform)
		}, function() {
			this.refs.menu.page = this.state.page;
			this.refs.menu.platform = this.state.platform;
			this.refs.page.page = this.state.page;
			this.refs.page.platform = this.state.platform;
			if(this.props.onChange) {
				this.props.onChange({
					"page": this.state.page,
					"platform": this.state.platform
				});
			}
		});
	}

	render() {
		var self = this;
		return (
			<React.Fragment>
				<DocsMenu
					page={this.state.page}
					platform={this.state.platform}
					data={this.props.data.menu}
					ref="menu"
				/>
				<DocsPage
					page={this.state.page}
					data={this.props.data.pages}
					platform={this.state.platform}
					platforms={this.props.data.platforms}
					ref="page"
				/>
			</React.Fragment>
		)
	}
}

module.exports = Docs
