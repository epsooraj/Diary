'''
@docstring
'''
from django.shortcuts import render
from django.views.generic import TemplateView


class LoginView(TemplateView):
    '''
    @docstring
    '''

    def get(self, request, *args, **kwargs):
        return render(request, "accounts/login.html", {})
