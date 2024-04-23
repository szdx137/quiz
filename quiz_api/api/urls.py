from django.urls import path, include
from api.views import CategoryViewSet, DifficutyLevelViewSet, OptionViewSet, QuestionViewSet
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'question', QuestionViewSet)
router.register(r'category', CategoryViewSet)
router.register(r'level', DifficutyLevelViewSet)
router.register(r'option', OptionViewSet)

urlpatterns = [
    path("quiz/", include(router.urls))
]
