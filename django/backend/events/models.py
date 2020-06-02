from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=200)
    event_type = models.ForeignKey(
        'event_types.EventType',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    description = models.CharField(max_length=5000)
    date = models.DateField()
    beginTime = models.TimeField()
    endTime = models.TimeField()
    host = models.ForeignKey(
        'hosts.Host',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )



    def __str__(self):
        return 'Event: {}'.format(self.name)