from rest_framework import serializers
from .models import Category, DifficultyLevel, Option, Question


class QuestionSerializer(serializers.HyperlinkedModelSerializer):
    # id was not exposed earlier in response so use this
    id = serializers.ReadOnlyField()

    class Meta:
        model = Question
        fields = "__all__"


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    # id was not exposed earlier in response so use this
    id = serializers.ReadOnlyField()

    class Meta:
        model = Category
        fields = "__all__"


class DifficultyLevelSerializer(serializers.HyperlinkedModelSerializer):
    # id was not exposed earlier in response so use this
    id = serializers.ReadOnlyField()

    class Meta:
        model = DifficultyLevel
        fields = "__all__"


class OptionSerializer(serializers.HyperlinkedModelSerializer):
    # id was not exposed earlier in response so use this
    id = serializers.ReadOnlyField()

    class Meta:
        model = Option
        fields = "__all__"
