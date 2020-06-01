from guardian.shortcuts import assign_perm
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from permissions.services import APIPermissionClassFactory
from tutors.models import Tutor
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
                    'retrieve': 'tutors.view_tutor',
                    'destroy': 'tutors.delete_tutor',
                    'update': 'tutors.change_tutor',
                    'partial_update': 'tutors.change_tutor',
                }
            }
        ),
    )