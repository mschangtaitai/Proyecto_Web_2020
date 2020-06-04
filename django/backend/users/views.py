from guardian.shortcuts import assign_perm
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from permissions.services import APIPermissionClassFactory
from users.models import User
from tutors.models import Tutor
from users.serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (
        APIPermissionClassFactory(
            name='UserPermission',
            permission_configuration={
                'base': {
                    'create': 'users.add_user',
                    'list': True,
                },
                'instance': {
                    'retrieve': 'users.view_user',
                    'destroy': 'users.delete_user',
                    'update': 'users.change_user',
                    'partial_update': 'users.change_user',
                }
            }
        ),
    )

