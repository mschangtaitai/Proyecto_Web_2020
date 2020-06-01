from django.db import models

class Classroom(models.Model):
    name = models.CharField(max_length=200)
    capacity = models.PositiveIntegerField()

    def __str__(self):
        return 'Classroom: {}'.format(self.name)