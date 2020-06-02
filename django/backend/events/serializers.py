from rest_framework import serializers

from events.models import Event

class UniversitySerializer(serializers.ModelSerializer):
    time = serializers.SerializerMethodField()

    class Meta:
        model = University
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

