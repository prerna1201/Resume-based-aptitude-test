from django.urls import path

from .views import (
    QuestionListCreateView,
    GenerateTestView,
    SubmitTestView,
    ResultListView,
    ResultDetailView
)

urlpatterns = [

    path(
        'questions/',
        QuestionListCreateView.as_view(),
        name='questions'
    ),

    path(
        'generate/<int:resume_id>/',
        GenerateTestView.as_view(),
        name='generate-test'
    ),

    path(
        'submit/',
        SubmitTestView.as_view(),
        name='submit-test'
    ),

    path(
        'results/',
        ResultListView.as_view(),
        name='results'
    ),

    path(
        'result/<int:result_id>/',
        ResultDetailView.as_view(),
        name='result-detail'
    ),

]