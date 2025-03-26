from django.shortcuts import render
from .serializers import StudentSerializer
from rest_framework import viewsets,filters
from .models import Student
# Create your views here.

class StudentViewSet(viewsets.ModelViewSet) :
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['name','rollnumber']
    ordering_fields = ['rollnumber','cgpa']

