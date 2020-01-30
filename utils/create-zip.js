const zipFolder = require('zip-folder')

const createZip = (folder, name) => {
	return new Promise((resolve, reject) => {
		zipFolder(folder, name, err => {
			if (err) {
				reject(err)
			}
			resolve()
		})
	})
}

module.exports = createZip
