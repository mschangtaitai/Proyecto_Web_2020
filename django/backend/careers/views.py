from django.shortcuts import render

# Create your views here.
from guardian.shortcuts import assign_perm
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from permissions.services import APIPermissionClassFactory
from careers.models import Career
from careers.serializers import CareerSerializer

class CareerViewSet(viewsets.ModelViewSet):
    queryset = Career.objects.all()
    serializer_class = CareerSerializer
    permission_classes = (
        APIPermissionClassFactory(
            name='CareerPermission',
            permission_configuration={
                'base': {
                    'create': 'careers.add_career',
                    'list': True,
                },
                'instance': {
                    'retrieve': True,
                    'destroy': 'careers.delete_career',
                    'update': 'careers.change_career',
                    'partial_update': 'careers.change_career',
                }
            }
        ),
    )