import { schema } from 'normalizr'

export const event = new schema.Entity(
    'events',
)

export const events = new schema.Array(event)