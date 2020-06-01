from django.db import models

class Host(models.Model):
    name = models.CharField(max_length=200)
    information = models.CharField(max_length=5000)

    def __str__(self):
        return 'Host: {}'.format(self.name)