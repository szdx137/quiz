from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from api.models import Category, DifficultyLevel, Question
from api.serializers import QuestionSerializer

# Create your views here.


class QuestionListAPIView(APIView):
    def post(self, request):
        category_name = request.data.get('category')
        difficulty_level_name = request.data.get('difficulty_level')

        if not category_name or not difficulty_level_name:
            return Response({'error': 'Both category and difficulty_level are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            category = Category.objects.get(category=category_name)
            difficulty_level = DifficultyLevel.objects.get(
                difficulty_level=difficulty_level_name)
        except Category.DoesNotExist:
            return Response({'error': f'Category "{category_name}" does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
        except DifficultyLevel.DoesNotExist:
            return Response({'error': f'Difficulty level "{difficulty_level_name}" does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

        questions = Question.objects.filter(
            category=category, difficulty_level=difficulty_level)
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
