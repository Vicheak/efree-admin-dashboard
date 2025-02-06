/**
 * Get name by local
 * @param {*} name
 * @param {*} local
 */
function getCountryNameByLocal(name, local = 'country_local_name') {
    if (name != '' && name != null) {
        try {
            name = JSON.parse(name)
            if (local == 'country_local_name') {
                return name.country_local_name
            } else {
                return name.country_third_name
            }
        } catch (e) {
            return name
        }
    } else {
        return null
    }
}

export default getCountryNameByLocal
