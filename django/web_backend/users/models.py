from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
  name = models.TextField(max_length=100, blank=True)
  email = models.TextField(max_length=100, blank=True)
  career = models.ForeignKey(
    'careers.Career', 
    on_delete=models.SET_NULL,
    null=True,
    blank=True
    )

  def __str__(self):
    return 'User: {}'.format(self.name)
