from rest_framework import serializers

from classrooms.models import Classroom

class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = (
            'id',
            'course',
            'capacity'
        )
