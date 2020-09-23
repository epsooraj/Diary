'''
@docstring
'''
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    path('auth/', include('allauth.urls')),
    path('accounts/', include('accounts.urls')),

    path('diary/', include("diary.urls")),
    path('api/', include("diary.urls")),

    path('', include('frontend.urls')),
]
