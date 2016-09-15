var generators = require('yeoman-generator'),
	replace = require('gulp-replace'),
	condition = require('gulp-if'),
	rename = require('gulp-rename');

module.exports = generators.Base.extend({
	prompting: function () {
		var config = this.config.getAll();
		return this.prompt(
			[
				{
					type: 'input',
					name: 'name',
					message: 'Your app name',
					validate: function(input) {
						var validateExp = new RegExp('^[0-9a-z]+$', 'i');
						return validateExp.test(input) ? true : 'The app name must consist only of latin letters and digits.';
					},
					default: config.name || this.appname
				},
				{
					type: 'confirm',
					name: 'jwt',
					message: 'Would you like to use JWT?',
					default: config.jwt
				},
				{
					type: 'confirm',
					name: 'components',
					message: 'Would you like to add a set of basic components?',
					default: config.components
				},
				{
					type: 'confirm',
					name: 'responsive',
					message: 'Would you like to use a responsive layout?',
					default: config.responsive
				},
				{
					type: 'confirm',
					name: 'backBtn',
					message: 'Would you like to attach custom handlers to browser back button clicks?',
					default: config.backBtn
				},
				{
					type: 'confirm',
					name: 'scrollToTop',
					message: 'Would you like to automatically scroll a view to top upon changing a state?',
					default: config.scrollToTop
				},
				{
					type: 'confirm',
					name: 'detectScreenBottom',
					message: 'Would you like to fire a special event upon user scrolling down to the bottom of the screen (useful for lazy loading of lists)?',
					default: config.detectScreenBottom
				}
			]
			)
			.then(function (answers) {
				this.log(answers);
				this.config.set(answers);
				this.config.save();

				this.registerTransformStream(replace('webAppName', answers.name));
			}.bind(this));
	},
	copyingBaseTemplate: function () {
		this.log('Copying base template');
		this.fs.copy(
			[
				this.templatePath('**'),
				this.templatePath('.*'),
				'!' + this.templatePath('*.variable*'),
				'!' + this.templatePath('*.*-addon*'),
				'!' + this.templatePath('*.*-addon/**'),
				'!' + this.templatePath('**/*.*-addon/**'),
				'!' + this.templatePath('**/*.variable*'),
				'!' + this.templatePath('**/*.*-addon*')
			],
			this.destinationRoot()
		);
	},
	copyingAddOns: function () {
		this.log('Copying add-ons');
		var config = this.config.getAll(),
			addons = Object.keys(config),
			copySrc = [];

		addons = addons.filter(function (addon) {
			return config[addon] === true;
		});
		addons.forEach(function(addon) {
			this.registerTransformStream(rename(function(path) {
				path.dirname = path.dirname.replace('.' + addon + '-addon', '');
				path.basename = path.basename.replace('.' + addon + '-addon', '');
				return path;
			}));
			copySrc.push(
				this.templatePath('*.' + addon + '-addon*'),
				this.templatePath('**/*.' + addon + '-addon*'),
				this.templatePath('*.' + addon + '-addon/**'),
				this.templatePath('**/*.' + addon + '-addon/**')
			);
		}.bind(this));
		if (copySrc.length) {
			this.fs.copy(copySrc, this.destinationRoot());
		}
	},
	copyingVariables: function () {
		this.log('Copying variables');
		var config = this.config.getAll();
		this.registerTransformStream(rename(function(path) {
			path.basename = path.basename.replace('.variable', '');
			return path;
		}));
		this.fs.copyTpl(
			[
				this.templatePath('**/*.variable*'),
				this.templatePath('*.variable*')
			],
			this.destinationRoot(),
			config
		);
	},
	install: function() {
		this.log('Installing dependencies');
		this.installDependencies();
	},
	end: function() {
		this.log('Your angular app is ready! Run \'gulp serve\' to start it. More info available at https://github.com/DSRCorporation/angular-generator.');
	}
});