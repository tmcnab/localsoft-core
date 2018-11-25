import {Features, Roles} from 'enums'
import {oneOf} from 'prop-types'

export * from 'prop-types'

export const feature = oneOf(Object.keys(Features))

export const role = oneOf(Object.keys(Roles))
