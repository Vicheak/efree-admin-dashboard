/**
 * Get name by local
 * @param {*} name
 * @param {*} local
 */
function getCommuneNameByLocal(name, local = 'commune_local_name') {
    if (name != '' && name != null) {
        try {
            name = JSON.parse(name)
            if (local == 'commune_local_name') {
                return name.commune_local_name
            } else {
                return name.commune_third_name
            }
        } catch (e) {
            return name
        }
    } else {
        return null
    }
}

export default getCommuneNameByLocal
