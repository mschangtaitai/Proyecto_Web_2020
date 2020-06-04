from rest_framework import serializers

from event_assigns.models import EventAssign

class EventAssignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Host
        fields = (
            'id',
            'user',
            'event'
        )
