from rest_framework.routers import DefaultRouter
from .views import DynamicFormViewSet, EmployeeViewSet

router = DefaultRouter()
router.register('forms', DynamicFormViewSet)
router.register('employees', EmployeeViewSet)

urlpatterns = router.urls
