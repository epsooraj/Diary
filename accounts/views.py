'''
@docstring
'''
from django.shortcuts import render
from django.views.generic import TemplateView
from django.shortcuts import redirect

from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework import permissions
from . import serializers


class LoginView(TemplateView):
    '''
    @docstring
    '''

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect("/diary/")
        return render(request, "accounts/login.html", {})


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.IsAuthenticated]
