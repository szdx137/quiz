from apiv2.views import QuestionListAPIView
from django.urls import path, include

urlpatterns = [
    path("questionset/", QuestionListAPIView.as_view())
]
