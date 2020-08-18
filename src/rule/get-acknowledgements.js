function getAcknowledgements(acknowledgements, contributors) {
	const sectionContent = Object.entries(acknowledgements)
	const sortedSections = sectionContent.sort(sortSections)

	return sortedSections.map(([title, content]) => {
		return getSectionText(title, content, contributors)
	})
}

function sortSections([a], [b]) {
	const priorities = ['funding', 'reviewers', 'previous_authors', 'authors']
	const priorityA = priorities.indexOf(a)
	const priorityB = priorities.indexOf(b)

	if (priorityA !== -1 || priorityB !== -1) {
		// sort by index, highest index first
		return priorityB - priorityA
	} else {
		// Sort revered alphabetically, ignoring case
		return a.toUpperCase() > b.toUpperCase() ? 1 : -1
	}
}

function getSectionText(title, items, contributors) {
	items = items.map(text => getContributorLink(text, contributors))
	title = getHeadingText(title)
	return { title, items }
}

function getHeadingText(underscoredStr) {
	const words = underscoredStr.split(/_/g)
	const uppercaseWords = words.map(word => word[0].toUpperCase() + word.substr(1))
	return uppercaseWords.join(' ')
}

function getContributorLink(text, contributors) {
	const contributor = contributors.find(({ name }) => {
		return text.toLowerCase() === name.toLowerCase()
	})
	if (!contributor) {
		return { text }
	}
	return {
		text: contributor.name,
		url: contributor.url,
	}
}

module.exports = { getAcknowledgements }
