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
		this.hash = new Hash();

		// Initialise the state
		this.state = {
			"page": this.hash.get('page') || props.page,
			"platform": this.hash.get('platform') || props.platform
		};

		// Bind methods
		this.pageChange = this.pageChange.bind(this);
		this.platformChange = this.platformChange.bind(this);
	}

	pageChange(page) {
		this.setState({
			"page": page
		}, function() {
			this.hash.set("page", page);
			this.refs.menu.page = page;
			this.refs.page.page = page;
			if(this.props.onChange) {
				this.props.onChange({
					"page": page,
					"platform": this.state.platform
				});
			}
		});
	}

	platformChange(platform) {
		this.setState({
			"platform": platform
		}, function() {
			this.hash.set("platform", platform);
			this.refs.menu.platform = platform;
			this.refs.page.platform = platform;
			if(this.props.onChange) {
				this.props.onChange({
					"page": this.state.page,
					"platform": platform
				});
			}
		});
	}

	render() {
		var self = this;
		return (
			<React.Fragment>
				<DocsMenu
					onPage={this.pageChange}
					page={this.state.page}
					platform={this.state.platform}
					data={this.props.data.menu}
					ref="menu"
				/>
				<DocsPage
					onPage={this.pageChange}
					onPlatform={this.platformChange}
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
