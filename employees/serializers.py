from rest_framework import serializers
from .models import DynamicForm, DynamicField, Employee

class DynamicFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = DynamicField
        fields = ['label', 'field_type']


class DynamicFormSerializer(serializers.ModelSerializer):
    fields = DynamicFieldSerializer(many=True)

    class Meta:
        model = DynamicForm
        fields = ['id', 'name', 'fields']

    def create(self, validated_data):
        fields_data = validated_data.pop('fields')
        form = DynamicForm.objects.create(**validated_data)

        for index, field in enumerate(fields_data):
            DynamicField.objects.create(
                form=form,
                order=index,
                **field
            )

        return form

    fields = DynamicFieldSerializer(many=True)

    class Meta:
        model = DynamicForm
        fields = ['id', 'name', 'fields']

    def create(self, validated_data):
        fields_data = validated_data.pop('fields')
        form = DynamicForm.objects.create(**validated_data)

        for index, field in enumerate(fields_data):
            DynamicField.objects.create(form=form, order=index, **field)

        return form


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
