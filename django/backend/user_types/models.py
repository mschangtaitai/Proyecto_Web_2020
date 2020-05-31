from django.db import models

class UserType(models.Model):
  name = models.TextField(max_length=50, blank=True)

  def __str__(self):
    return 'User type: {}'.format(self.name)