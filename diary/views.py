'''
@docstring
'''
from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect

from .models import Diary
from .forms import DiaryForm


class DiaryView(LoginRequiredMixin, TemplateView):
    '''
    @docstring
    '''

    def fetch_diary(self, user):
        '''
        @docstring
        '''
        diary_pages = []
        try:
            diary_pages_obs = Diary.objects.filter(user=user)

            for diary_pages_obj in diary_pages_obs:
                diary_pages.append({
                    "id": diary_pages_obj.id,
                    "heading": diary_pages_obj.heading,
                    "text": diary_pages_obj.text,
                    "date": diary_pages_obj.date
                })

        except Exception as ex:
            print(ex)

        return diary_pages

    def get(self, request, *args, **kwargs):

        form = DiaryForm()

        response = {
            "diary_pages": self.fetch_diary(request.user),
            "form": form
        }

        return render(request, "diary/diary.html", response)

    def post(self, request):
        '''
        @docstring
        '''

        diary_form = DiaryForm(request.POST)

        if diary_form.is_valid():
            print(diary_form.cleaned_data)
            df_obj = Diary(
                user=request.user,
                heading=diary_form.cleaned_data["heading"],
                text=diary_form.cleaned_data["body"])
            df_obj.save()

            diary_form = DiaryForm()

        return redirect("/diary/")


class DiaryPage(LoginRequiredMixin, TemplateView):
    '''
    @docstring
    '''

    def get(self, request, *args, **kwargs):
        response = {"edit": False}

        try:
            if kwargs["action"] == 'edit':
                response["edit"] = True
        except:
            pass

        try:
            diary_obj = Diary.objects.get(
                id=kwargs["postid"], user=request.user)

            response["id"] = diary_obj.id
            response["heading"] = diary_obj.heading
            response["text"] = diary_obj.text

            response["form"] = DiaryForm(
                {"heading": diary_obj.heading, "body": diary_obj.text})

        except Exception as ex:
            print(ex)

        return render(request, "diary/diary_page.html", response)

    def post(self, request, *args, **kwargs):
        '''
        @docstring
        '''

        if kwargs["action"] == "edit":
            try:
                diary_form = DiaryForm(request.POST)

                if diary_form.is_valid():
                    diary_obj = Diary.objects.get(
                        id=kwargs["postid"],
                        user=request.user
                    )
                    diary_obj.heading = diary_form.cleaned_data["heading"]
                    diary_obj.text = diary_form.cleaned_data["body"]
                    diary_obj.save()

            except Exception as ex:
                print(ex)

            return redirect("/diary/" + str(diary_obj.id))

        elif kwargs["action"] == "delete":
            try:
                post_id = kwargs["postid"]
                Diary.objects.get(
                    id=kwargs["postid"], user=request.user).delete()

            except Exception as ex:
                print(ex)

            return redirect("/diary/")

        return redirect("/diary/")
