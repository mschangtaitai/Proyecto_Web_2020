from rest_framework import serializers

from tutors.models import Tutor

class TutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutor
        fields = (
            'id',
            'user_id',
            'course'
        )
