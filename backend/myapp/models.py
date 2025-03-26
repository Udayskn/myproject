from django.db import models

# Create your models here.
class Student(models.Model):
    name = models.CharField(max_length=100)
    rollnumber = models.CharField(max_length=10,unique=True)
    cgpa = models.FloatField()
    def __str__(self):
        return f"{self.name} ({self.rollnumber})"
    