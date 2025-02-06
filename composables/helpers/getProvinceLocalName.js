/**
 * Get name by local
 * @param {*} name
 * @param {*} local
 */
function getProvinceNameByLocal(name, local = 'province_local_name') {
    if (name != '' && name != null) {
        try {
            name = JSON.parse(name)
            if (local == 'province_local_name') {
                return name.province_local_name
            } else {
                return name.province_third_name
            }
        } catch (e) {
            return name
        }
    } else {
        return null
    }
}

export default getProvinceNameByLocal
