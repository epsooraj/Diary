'''
@docstring
'''
from rest_framework import serializers

from .models import Diary


class DiarySerializer(serializers.ModelSerializer):
    '''
    @docstring
    '''
    class Meta:
        model = Diary
        fields = ('date', 'heading', 'text')
