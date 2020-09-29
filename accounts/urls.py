'''
@docstring
'''
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views

from . import views

urlpatterns = [
    path('login/', views.LoginView.as_view(), name="login"),
    path('user/', views.UserView.as_view(), name="user"),

    path('user/create/', views.RegisterUser.as_view(), name="create_user"),

    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name="token_create"),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name="token_refresh")
]
