from rest_framework import serializers

from classrooms.models import Classroom

class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = (
            'id',
<<<<<<< HEAD
            'name',
=======
            'course',
>>>>>>> ded5b369557e236f11f16c900ca6e031a5e6918d
            'capacity'
        )
