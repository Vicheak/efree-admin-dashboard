/**
 * Get name by local
 * @param {*} name
 * @param {*} local
 */
function getVillageNameByLocal(name, local = 'village_local_name') {
    if (name != '' && name != null) {
        try {
            name = JSON.parse(name)
            if (local == 'village_local_name') {
                return name.village_local_name
            } else {
                return name.village_third_name
            }
        } catch (e) {
            return name
        }
    } else {
        return null
    }
}

export default getVillageNameByLocal
