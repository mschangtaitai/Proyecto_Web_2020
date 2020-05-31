from django.db import models

class Faculty(models.Model):
  name = models.TextField(max_length=100, blank=True)
  university = models.ForeignKey(
    'universities.University',
    on_delete=models.SET_NULL,
    null=True,
    blank=True

  )

  def __str__(self):
    return 'Faculty: {}'.format(self.name)