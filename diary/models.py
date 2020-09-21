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
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE,)
    date = models.DateTimeField(auto_now_add=True)
    heading = models.TextField(null=True, blank=True)
    text = models.TextField(null=True, blank=True)

    def __str__(self):
        return str(self.user) + " " + str(self.heading) + " " + str(self.date)

    class Meta:
        verbose_name_plural = "diaries"
        ordering = ('-date',)
