from guardian.shortcuts import assign_perm
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from permissions.services import APIPermissionClassFactory
from hosts.models import Host
from hosts.serializers import HostSerializer

class HostViewSet(viewsets.ModelViewSet):
    queryset = Host.objects.all()
    serializer_class = HostSerializer
    permission_classes = (
        APIPermissionClassFactory(
            name='HostPermission',
            permission_configuration={
                'base': {
                    'create': 'hosts.add_host',
                    'list': True,
                },
                'instance': {
                    'retrieve': True,
                    'destroy': 'hosts.delete_host',
                    'update': 'hosts.change_host',
                    'partial_update': 'hosts.change_host',
                }
            }
        ),
    )