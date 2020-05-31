from guardian.shortcuts import assign_perm
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from permissions.services import APIPermissionClassFactory
from user_types.models import UserType
from user_types.serializers import UserTypeSerializer

def evaluate_permission(user, obj, request):
    return user.id == obj.owner.name

class UserTypeViewSet(viewsets.ModelViewSet):
    queryset = UserType.objects.all()
    serializer_class = UserTypeSerializer
    permission_classes = (
        APIPermissionClassFactory(
            name='UserPermission',
            permission_configuration={
                'base': {
                    'create': True,
                    'list': True
                },
                'instance': {
                    'retrieve': 'pets.view_pet',
                    'destroy': False,
                    'update': True,
                    'partial_update': 'pets.change_pet',
                    'notify': evaluate_permission,
                    # 'update_permissions': 'users.add_permissions'
                    # 'archive_all_students': phase_user_belongs_to_school,
                    # 'add_clients': True,
                }
            }
        ),
    )

    def perform_create(self, serializer):
        user = serializer.save()
        user = self.request.user
        return Response(serializer.data)
