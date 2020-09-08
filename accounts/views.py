'''
@docstring
'''
from django.shortcuts import render
from django.views.generic import TemplateView
from django.shortcuts import redirect


class LoginView(TemplateView):
    '''
    @docstring
    '''

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect("/diary/")
        return render(request, "accounts/login.html", {})
