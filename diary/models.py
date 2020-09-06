'''
@docstring
'''
import datetime

from django.db import models
from django.conf import settings


class Diary(models.Model):
    '''
    @docstring
    '''
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    date = models.DateField(default=datetime.date.today)
    heading = models.TextField(null=True, blank=True)
    text = models.TextField(null=True, blank=True)

    def __str__(self):
        return str(self.user) + " " + (self.heading) + " " + str(self.date)

    class Meta:
        verbose_name_plural = "diaries"
