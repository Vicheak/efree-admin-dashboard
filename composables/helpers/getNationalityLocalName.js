/**
 * Get name by local
 * @param {*} name
 * @param {*} local
 */
function getNationalityByLocal(name, local = 'country_local_nationality') {
    if (name != '' && name != null) {
        try {
            name = JSON.parse(name)
            if (local == 'country_local_nationality') {
                return name.country_local_nationality
            } else {
                return name.country_third_nationality
            }
        } catch (e) {
            return name
        }
    } else {
        return null
    }
}

export default getNationalityByLocal
