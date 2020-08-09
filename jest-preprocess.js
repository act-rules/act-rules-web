const jestBabel = require('babel-jest')
module.exports = jestBabel.createTransformer({
	presets: ['babel-preset-gatsby'],
})
