/**
 * Hash
 *
 * JS Library to manage hash values
 *
 * @author Chris Nasr
 * @copyright OuroborosCoding
 * @created 2018-12-09
 */

// Key regex
var _keyRE = /^[a-z]+$/;

/**
 * Hash
 *
 * A class for fetching and storing the individual parts of a URL hash
 */
class Hash {

	/**
	 * Constructor
	 *
	 * Inits the object by fetching and parsing the current location hash
	 *
	 * @name Hash
	 * @access public
	 * @return {[type]} [description]
	 */
	constructor() {

		// Init the member variable
		this.hash = {};

		// If there's anything in the hash
		if(window.location.hash.length > 1) {
			var regex = /([^=&]+)=?([^&]*)/g
			var field = null;

			// Go through each part found
			while(field = regex.exec(window.location.hash.substring(1))) {
				this.hash[field[1]] = field[2].replace('+', ' ');
			}
		}
	}

	/**
	 * Get
	 *
	 * Returns a hash key
	 *
	 * @name get
	 * @access public
	 * @param str key			The key to look for
	 * @param str default_		The value to return if the key isn't found
	 * @return str
	 */
	get(key, default_) {

		// If the key is invalid
		if(!_keyRE.test(key)) {
			throw 'Invalid Hash key';
		}

		// If there is a value for the key
		if(typeof this.hash[key] != 'undefined') {
			return this.hash[key];
		}

		// Else, return the default
		else {
			return default_;
		}
	}

	/**
	 * Set
	 *
	 * Sets a specific key
	 *
	 * @name set
	 * @access public
	 * @param str key			The key to set
	 * @param str value			The value to set the key to
	 */
	set(key, value) {

		// If the key is invalid
		if(!_keyRE.test(key)) {
			throw 'Invalid Hash key';
		}

		// Set the key
		this.hash[key] = value;

		// Init an array to store the parts
		var hash = [];

		// Go through each key
		for(var k in this.hash) {
			hash.push(k + '=' + encodeURIComponent(this.hash[k]));
		}

		// Reset the window location hash
		window.location.hash = hash.join('&');
	}
}

module.exports = Hash;
