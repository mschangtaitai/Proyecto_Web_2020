from django.db import models

class Career(models.Model):
  name = models.TextField(max_length=100, blank=True)
  faculty = models.ForeignKey(
    'faculties.Faculty',
    on_delete=models.SET_NULL,
    null=True,
    blank=True
  )

  def __str__(self):
    return 'Career: {}'.format(self.name)