from django.shortcuts import render

from guardian.shortcuts import assign_perm
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from permissions.services import APIPermissionClassFactory
from faculties.models import Faculty
from faculties.serializers import FacultySerializer

class FacultyViewSet(viewsets.ModelViewSet):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer
    permission_classes = (
        APIPermissionClassFactory(
            name='facultyPermission',
            permission_configuration={
                'base': {
                    'create': 'faculties.add_faculty',
                    'list': True,
                },
                'instance': {
                    'retrieve': True,
                    'destroy': 'faculties.delete_faculty',
                    'update': 'faculties.change_faculty',
                    'partial_update': 'faculties.change_faculty',
                }
            }
        ),
    )