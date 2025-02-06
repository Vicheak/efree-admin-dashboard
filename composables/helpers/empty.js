const empty = (value) => {
    if (
		value == null ||
		value == '' ||
		value == undefined
	) {
		return true
	} else {
		return false
	}
}

export default empty