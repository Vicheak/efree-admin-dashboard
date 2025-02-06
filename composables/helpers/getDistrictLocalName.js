/**
 * Get name by local
 * @param {*} name
 * @param {*} local
 */
function getDistrictNameByLocal(name, local = 'district_local_name') {
    if (name != '' && name != null) {
        try {
            name = JSON.parse(name)
            if (local == 'district_local_name') {
                return name.district_local_name
            } else {
                return name.district_third_name
            }
        } catch (e) {
            return name
        }
    } else {
        return null
    }
}

export default getDistrictNameByLocal
