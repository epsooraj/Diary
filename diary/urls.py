'''
@docstring
'''
from django.urls import path
from . import views

urlpatterns = [
    path('', views.DiaryView.as_view(), name="diary"),
]
