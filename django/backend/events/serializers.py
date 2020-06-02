from rest_framework import serializers
from datetime import datetime
from events.models import Event

class EventSerializer(serializers.ModelSerializer):
    time = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = (
            'id',
            'title',
            'event_type',
            'description',
            'date',
            'beginTime',
            'endTime',
            'host',
            'time',
        )

    def get_time(self, obj):
        format = '%H:%M:%S'
        time = datetime.strptime(str(obj.endTime), format) - datetime.strptime(str(obj.beginTime), format)
        return time
