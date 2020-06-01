from rest_framework import serializers

from event_types.models import EventType

class EventTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventType
        fields = (
            'id',
            'name'
        )
