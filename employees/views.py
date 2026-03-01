from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import DynamicForm, Employee
from .serializers import DynamicFormSerializer, EmployeeSerializer

class DynamicFormViewSet(ModelViewSet):
    queryset = DynamicForm.objects.all()
    serializer_class = DynamicFormSerializer
    permission_classes = [IsAuthenticated]


class EmployeeViewSet(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get('search')

        if search:
            queryset = queryset.filter(data__icontains=search)

        return queryset
