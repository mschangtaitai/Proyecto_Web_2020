from guardian.shortcuts import assign_perm
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core import serializers
from django.http import HttpResponse

from permissions.services import APIPermissionClassFactory
from users.models import User
from tutors.models import Tutor
from django.contrib.auth.models import Group
from users.serializers import UserSerializer
from users.serializers import GroupSerializer



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
                    'retrieve': True,
                    'destroy': 'users.delete_user',
                    'update': 'users.change_user',
                    'partial_update': 'users.change_user',
                    'isStudent': True,
                }
            }
        ),
    )

    @action(detail=True, url_path='isstudent', methods=['get'])
    def isStudent(self, request, pk=None):
        response = []
        user = self.get_object()
        userGroups = user.groups.all()
        print(userGroups)
        group = Group.objects.get(name='student')
        bool = group in userGroups
        response.append(bool)
        return Response(response)