from guardian.shortcuts import assign_perm
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from permissions.services import APIPermissionClassFactory
from event_assigns.models import EventAssign
from event_assigns.serializers import EventAssignSerializer
from users.models import User
from users.serializers import UserSerializer

class EventAssignViewSet(viewsets.ModelViewSet):
    queryset = EventAssign.objects.all()
    serializer_class = EventAssignSerializer
    permission_classes = (
        APIPermissionClassFactory(
            name='EventAssignPermission',
            permission_configuration={
                'base': {
                    'create': True,
                    'list': True,
                },
                'instance': {
                    'retrieve': True,
                    'destroy': 'event_assigns.delete_event_assign',
                    'update': 'event_assigns.change_event_assign',
                    'partial_update': 'event_assigns.change_event_assign',
                    'eventUsers': True
                }
            }
        ),
    )

    @action(detail=False, url_path='eventusers', methods=['post'])
    def eventUsers(self, request):
        try:
            response = []
            eventData = request.data['event']
            eventAssigns = EventAssign.objects.filter(event = eventData)
            print("Este es el event Data : " + eventData)
            for user in eventAssigns:
                response.append(UserSerializer(event.user).data)
            return Response(response)
        except:
            return Response({'detail':'id is not valid'}) 