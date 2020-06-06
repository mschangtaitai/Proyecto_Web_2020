import { schema } from 'normalizr'

export const group = new schema.Entity(
    'groups',
)

export const groups = new schema.Array(group)