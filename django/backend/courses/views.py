from guardian.shortcuts import assign_perm
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from permissions.services import APIPermissionClassFactory
from courses.models import Course
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