from django.db import models

class DynamicForm(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class DynamicField(models.Model):
    FIELD_TYPES = (
        ('text', 'Text'),
        ('number', 'Number'),
        ('date', 'Date'),
        ('password', 'Password'),
    )

    form = models.ForeignKey(DynamicForm, on_delete=models.CASCADE, related_name='fields')
    label = models.CharField(max_length=100)
    field_type = models.CharField(max_length=20, choices=FIELD_TYPES)
    order = models.IntegerField()

    def __str__(self):
        return self.label


class Employee(models.Model):
    form = models.ForeignKey(DynamicForm, on_delete=models.CASCADE)
    data = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Employee - {self.id}"
