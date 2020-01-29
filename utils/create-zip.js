const zipFolder = require('zip-folder')

const createZip = (folder, name) => {
	console.log(folder)
	return new Promise((resolve, reject) => {
		zipFolder(folder, name, err => {
			if (err) {
				reject(err)
			}
			console.log('111')
			resolve()
		})
	})
}

module.exports = createZip
