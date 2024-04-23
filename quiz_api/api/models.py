from statistics import mode
from django.db import models

# Create your models here.


class Students(models.Model):
    full_name = models.CharField(max_length=255)
    address = models.TextField()
    # email if not unique we get error
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.full_name


class Category(models.Model):
    # category name should be unique
    category = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.category


class DifficultyLevel(models.Model):
    # difficulty_level should be unique
    difficulty_level = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.difficulty_level


class Question(models.Model):
    # auto-generated but can also be customized like tis
    id = models.AutoField(primary_key=True)
    question = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    difficulty_level = models.ForeignKey(
        DifficultyLevel, on_delete=models.CASCADE)

    def __str__(self):
        return self.question


class Option(models.Model):
    option = models.TextField()
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name='options')
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.option
