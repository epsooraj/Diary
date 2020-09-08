'''
@docstring
'''
from django.urls import path
from . import views

urlpatterns = [
    path('<int:postid>/', views.DiaryPage.as_view(), name="diaryPage"),
    path('<int:postid>/<slug:action>/',
         views.DiaryPage.as_view(), name="diaryPageEdit"),
    path('', views.DiaryView.as_view(), name="diary"),
]
