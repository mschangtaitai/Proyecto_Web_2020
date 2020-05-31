from guardian.shortcuts import assign_perm
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from permissions.services import APIPermissionClassFactory
from faculties.models import Faculty
from faculties.serializers import FacultySerializer

def evaluate_permission(user, obj, request):
    return user.first_name == obj.owner.name

class FacultyViewSet(viewsets.ModelViewSet):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer
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
        assign_perm('pets.change_pet', user, pet)
        return Response(serializer.data)
