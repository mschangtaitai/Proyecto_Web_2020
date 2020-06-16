from guardian.shortcuts import assign_perm
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from permissions.services import APIPermissionClassFactory
from events.models import Event
from event_assigns.models import EventAssign
from users.models import User
from events.serializers import EventSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = (
        APIPermissionClassFactory(
            name='EventPermission',
            permission_configuration={
                'base': {
                    'create': 'events.add_event',
                    'list': True,
                },
                'instance': {
                    'retrieve': True,
                    'destroy': 'events.delete_event',
                    'update': 'events.change_event',
                    'partial_update': 'events.change_event',
                    'getEventUsers': True,
                }
            }
        ),
    )