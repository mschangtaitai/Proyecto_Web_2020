from django.shortcuts import render

from guardian.shortcuts import assign_perm
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from permissions.services import APIPermissionClassFactory
from tutors.models import Tutor
from users.models import User
from users.serializers import UserSerializer
from tutors.serializers import TutorSerializer

class TutorViewSet(viewsets.ModelViewSet):
    queryset = Tutor.objects.all()
    serializer_class = TutorSerializer
    permission_classes = (
        APIPermissionClassFactory(
            name='TutorPermission',
            permission_configuration={
                'base': {
                    'create': 'tutors.add_tutor',
                    'list': True,
                },
                'instance': {
                    'retrieve': True,
                    'destroy': 'tutors.delete_tutor',
                    'update': 'tutors.change_tutor',
                    'partial_update': 'tutors.change_tutor',
                    'courseTutors': True

                }
            }
        ),
    )

    @action(detail=False, url_path='coursetutors', methods=['post'])
    def courseTutors(self, request):
        try:
            response = []
            print(request)
            courseData = request.data['course_id']
            print('course Data antes de tutors' + courseData)
            tutors = Tutor.objects.filter(course = courseData)
            print("Este es el course Data : " + courseData)
            for tutor in tutors:
                response.append(UserSerializer(tutor.user_id).data)
            return Response(response)
        except:
            return Response({'detail':'id is not valid'}) 
        