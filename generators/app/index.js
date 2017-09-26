const Generator = require('yeoman-generator'),
	replace = require('gulp-replace'),
	rename = require('gulp-rename');

module.exports = class extends Generator {
	prompting () {
		var config = this.config.getAll();
		return this.prompt(
			[
				{
					type: 'input',
					name: 'name',
					message: 'Your app name',
					validate: function (input) {
						var validateExp = new RegExp('^[0-9a-z]+$', 'i');
						return validateExp.test(input) ? true : 'The app name must consist only of latin letters and digits.';
					},
					default: config.name || this.appname
				}
			]
			)
			.then(function (answers) {
				this.log(answers);
				this.config.set(answers);
				this.config.save();

				this.registerTransformStream(replace('webAppName', answers.name));
			}.bind(this));
	}

	copyingBaseTemplate () {
		this.log('Copying base template');
		this.fs.copy(
			[
				this.templatePath('**'),
				this.templatePath('.*'),
				this.templatePath('**/.*')
			],
			this.destinationRoot()
		);
	}

	install () {
		this.log('Installing dependencies');
		this.yarnInstall();
	}

	end () {
		this.log('Your angular app is ready! Run \'npm start\' to start it. More info available at https://github.com/DSRCorporation/angular-generator.');
	}
}