from django.db import models

class Course(models.Model):
    name = models.CharField(max_length=200)
    career = models.ForeignKey(
        'careers.Career',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    def __str__(self):
        return 'Course: {}'.format(self.name)