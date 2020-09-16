'''
@docstring
'''
from django.shortcuts import render
from django.views.generic import TemplateView
from django.shortcuts import redirect
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from . import serializers


class LoginView(TemplateView):
    '''
    @docstring
    '''

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect("/diary/")
        return render(request, "accounts/login.html", {})


class RegisterUser(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format="json"):
        serializer = serializers.UserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
