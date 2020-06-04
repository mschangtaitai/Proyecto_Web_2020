from guardian.shortcuts import assign_perm
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from permissions.services import APIPermissionClassFactory
from event_types.models import EventType
from event_types.serializers import EventTypeSerializer

class EventTypeViewSet(viewsets.ModelViewSet):
    queryset = EventType.objects.all()
    serializer_class = EventTypeSerializer
    permission_classes = (
        APIPermissionClassFactory(
            name='EventTypePermission',
            permission_configuration={
                'base': {
                    'create': 'event_types.add_event_type',
                    'list': True,
                },
                'instance': {
                    'retrieve': True,
                    'destroy': True,
                    'update': 'event_types.change_event_type',
                    'partial_update': 'event_types.change_event_type',
                }
            }
        ),
    )