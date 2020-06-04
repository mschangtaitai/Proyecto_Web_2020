from guardian.shortcuts import assign_perm
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from permissions.services import APIPermissionClassFactory
from courses.models import Course
from tutors.models import Tutor
from tutors.serializers import TutorSerializer
from courses.serializers import CourseSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = (
        APIPermissionClassFactory(
            name='CoursePermission',
            permission_configuration={
                'base': {
                    'create': 'courses.add_course',
                    'list': True,
                },
                'instance': {
                    'retrieve': True,
                    'destroy': 'courses.delete_course',
                    'update': 'courses.change_course',
                    'partial_update': 'courses.change_course',
                }
            }
        ),
    )
        
    # @action(detail=True, url_path='coursetutors', methods=['post'])
    # def courseTutors(self, request):
    #     course = self.get_Object()
    #     tutor_list = Tutor.objects.filter(course = course)
    #     response = []
    #     for tutor in Tutor.objects.filter(baby=baby):
    #         response.append(TutorSerializer(tutor).data)
    #     return Response(response)


    # @action(detail=False, methods=['post'])
    # def unfollow(self, request):
    #     try:
    #         user = self.request.user
    #         userid = request.data['id']
    #         follow = Follow.objects.filter(user=user,follower=userid)
    #         follow.delete()
    #         return Response({'status':'ok'})
    #     except:
    #         return Response({'detail':'id is not valid'}) 