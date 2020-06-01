from django.db import models

class EventType(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return 'Event type: {}'.format(self.name)