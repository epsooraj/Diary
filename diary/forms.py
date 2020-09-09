'''
@docstring
'''
from django import forms


class DiaryForm(forms.Form):
    '''
    @docstring
    '''
    heading = forms.CharField(label="Heading", widget=forms.TextInput(
        attrs={'class': 'mb-4 w-100 display-4 p-2 rounded-lg'}))
    body = forms.CharField(label="Diary", widget=forms.Textarea(
        attrs={'class': 'mb-4 w-100 lead p-2 rounded-lg'}))
