import { debug } from '../../config/index'

const restrictedDomaineIds = debug ? [] : ['f', 'r', 's']
const restrictedStatutIds = debug ? [] : ['dmc', 'ech', 'ind']

export { restrictedDomaineIds, restrictedStatutIds }
