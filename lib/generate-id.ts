import {v4} from 'uuid'

export const generateId = () => v4()

export const generateApiKey = () => `sk-${v4().replace(/-/g, '')}`
