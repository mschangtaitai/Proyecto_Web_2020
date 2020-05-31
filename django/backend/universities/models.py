from django.db import models

class University(models.Model):
  name = models.TextField(max_length=100, blank=True)
  addres = models.TextField(max_length=300, blank=True)

  def __str__(self):
    return 'University: {}'.format(self.name)