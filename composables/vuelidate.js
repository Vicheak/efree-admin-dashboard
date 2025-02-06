import { useVuelidate } from '@vuelidate/core'

export function vuelidate(rules, form) {
    return useVuelidate(rules, form)
}