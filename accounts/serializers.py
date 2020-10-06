from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


class UserSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=True, validators=[
        UniqueValidator(
            queryset=User.objects.all(),
            message="Email already exist"
        )
    ])
    username = serializers.CharField(validators=[
        UniqueValidator(
            queryset=User.objects.all(),
            message="Username already exist"
        )
    ])
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validate_data):
        password = validate_data.pop('password', None)
        instance = self.Meta.model(**validate_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
