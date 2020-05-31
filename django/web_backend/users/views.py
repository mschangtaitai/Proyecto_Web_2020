from guardian.shortcuts import assign_perm
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from permissions.services import APIPermissionClassFactory
from users.models import User
from users.serializers import UserSerializer

def evaluate_permission(user, obj, request):
    return user.id == obj.id

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    )

    def perform_create(self, serializer):
        user = serializer.save()
        user = self.request.user
        return Response(serializer.data)
