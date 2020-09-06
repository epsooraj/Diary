'''
@docstring
'''
from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin

from .models import Diary


class DiaryView(LoginRequiredMixin, TemplateView):
    '''
    @docstring
    '''

    def get(self, request, *args, **kwargs):

        response = {}

        try:
            diary_pages_obs = Diary.objects.filter(user=request.user)

            diary_pages = []
            for diary_pages_obj in diary_pages_obs:
                diary_pages.append({
                    "heading": diary_pages_obj.heading,
                    "text": diary_pages_obj.text,
                    "date": diary_pages_obj.date
                })

            print(diary_pages)

            response = {
                "diary_pages": diary_pages
            }
        except Exception as ex:
            print(ex)

        return render(request, "diary/diary.html", response)
