import { schema } from 'normalizr'

export const event_assign = new schema.Entity(
    'event_assigns',
)

export const event_assigns = new schema.Array(event_assign)