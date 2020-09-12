# Project Template
A simple template for a project. The benefit of using this as a template for a project is that the code is watched and the page is updated automatically as we go. In addition the files JS and CSS gets minified, which makes our page act faster. Gulp also adds necessary prefixes to the CSS and the style itself has been optimized which makes the site look stunning from the very beginning.
## Features
* **Gulp**. Keep the project running smooth with Gulp.
* **SASS**. Clean efficient style using SASS and the SMACSS method.
## Requirements
* **Node.js**
## Installation
Install developer dependencies
```bash
$ npm install
```
### Standard project
Open the terminal, cd into the current folder and run "npm start".
```bash
$ npm start
```
### PHP project
1. Start a server through your favorite web development environment.
2. Get the local URL for the specific site that is running on the server.
3. Go in gulp-config.js and set the URL as the proxy.
```js
module.exports.config = {
	"proxy": "example.test",
	"port": 8080
}
```
4. Open the terminal, cd into the current folder and run "npm start".
```bash
$ npm start
```
## Usage
Both the style and JS is minimized and ordered using Gulp.
### SMACSS
The CSS method for this project is [SMACSS](http://smacss.com/). Since we're in 2020 we've used SASS which compiles into a style.css file. The main thing to know about SMACSS is that the style is sorted into five categories to make the style easy to work with even as the code become really large. However, in our case we also have the category global which stores all the global SASS variables, mixins etc. which is used down the tree later.
The five (+1) categories are:
1. Global - Variables for global colors, sizes, fonts, etc. for the site.
2. Base - The base style for tag elements (reset etc.)
3. Layout - The biggest components that works as containers as for example header and footer
4. Module - Reusable modules. The components that go inside the layouts.
5. State - Overrides all other styles by forcing a change in a components state.
6. Theme - Whenever there should be an adjustment (as for example colors etc.) to a child theme. Not used unless there's actually several themes on the site.
### JavaScript
The different scripts is concatenated into two minimized files by default: vendors.min.js and customs.min.js. This happens because Gulp goes throught the folders named "customs" and "vendors" and merge the underlying files into one single file. We do also have the specifics where each file gets minified and not merged.
The reason for this is that specifics are specific scripts for specific pages. Therefore there would not make any sense to merge the specifics and make longer files than needed for the particular page.
Vendors are files that other JavaScript files likely depent on since these are a collection of the JavaScript libraries that are used.
Customs are the regular JavaScripts that count for the entire site as for example scripts for menu change etc.
### Naming
The naming convention is based on BEM. Here's an example when creating the Module "block".
![A screenshot of the block example](src/assets/images/project-template-screen.png?raw=true)
```html
<div class="block">
	<img class="block__img" src="https://picsum.photos/seed/picsum/200/300"/>
	<div class="block__content">
		<p>Lots of text</p>
	</div>
</div>
<div class="block--transparent">
	<img class="block__img" src="https://picsum.photos/seed/picsum/200/300"/>
	<div class="block__content">
		<p>Lots of text</p>
	</div>
</div>
<div class="block--transparent">
	<img class="block__img--full" src="https://picsum.photos/seed/picsum/200/300"/>
	<div class="block__content">
		<p>Lots of text</p>
	</div>
</div>
```
#### CSS example:
```css
.block, .block--transparent {
	display: inline-block;
	width: 200px;
	min-height: 200px;
	margin: 20px;
	background-color: lightgrey;
	color: black;
	box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
}
.block--transparent {
	background-color: transparent;
}
.block__img, .block__img--full {
	display: block;
	margin: 0 auto;
	padding-top: 20px;
	width: 80%;
}
.block__img--full {
	padding-top: 0;
	width: 100%;
}
.block__content {
	padding: 20px;
}
```
#### SCSS example:
```scss
.block {
	display: inline-block;
	width: 200px;
	min-height: 200px;
	margin: 20px;
	background-color: lightgrey;
	color: black;
	box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
	&--transparent {
		@extend .block;
		background-color: transparent;
	}
	&__img {
		display: block;
		margin: 0 auto;
		padding-top: 20px;
		width: 80%;
		&--full{
			@extend .block__img;
			padding-top: 0;
			width: 100%;
		}
	}
	&__content {
		padding: 20px;
	}
}
```
### IDs
IDs should not be used for styling, but should be added in HTML for JavaScript purposes. Here's a list with IDs that should be included as a standard:
* #wrapper
* #site-footer
* #site-sidebar
* #site-content
* #site-navigation
* #site-header
## Credits
[Johann Vårvik](https://github.com/vaarvik)
## License
MIT
