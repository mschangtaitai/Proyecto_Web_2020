"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from rest_framework_jwt.views import (
    obtain_jwt_token,
    refresh_jwt_token
)

from universities.views import UniversityViewSet
from faculties.views import FacultyViewSet
from careers.views import CareerViewSet
from users.views import UserViewSet


router = routers.DefaultRouter()

router.register(r'users', UserViewSet)
router.register(r'universities', UniversityViewSet)
router.register(r'faculties', FacultyViewSet)
router.register(r'careers', CareerViewSet)
router.register(r'careers', CareerViewSet)
router.register(r'careers', CareerViewSet)
router.register(r'careers', CareerViewSet)
router.register(r'careers', CareerViewSet)



urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls')),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/token-auth/', obtain_jwt_token),
    url(r'^api/v1/token-refresh/', refresh_jwt_token),
]
