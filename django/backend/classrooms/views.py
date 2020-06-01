from guardian.shortcuts import assign_perm
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from permissions.services import APIPermissionClassFactory
from classrooms.models import Classroom
from classrooms.serializers import ClassroomSerializer

class ClassroomViewSet(viewsets.ModelViewSet):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer
    permission_classes = (
        APIPermissionClassFactory(
            name='ClassroomPermission',
            permission_configuration={
                'base': {
                    'create': 'classrooms.add_classroom',
                    'list': True,
                },
                'instance': {
                    'retrieve': True,
                    'destroy': 'classrooms.delete_classroom',
                    'update': 'classrooms.change_classroom',
                    'partial_update': 'classrooms.change_classroom',
                }
            }
        ),
    )