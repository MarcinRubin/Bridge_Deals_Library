from rest_framework import serializers

from .models import Profile, User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["email", "password", "confirm_password"]

    def validate(self, attrs):
        password = attrs.get("password")
        confirm_password = attrs.get("confirm_password")
        if password != confirm_password:
            raise serializers.ValidationError(
                "Password is different from the confirm password!"
            )
        return attrs

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("User with this email already exists!")
        return value

    def create(self, validated_data):
        user_obj = User.objects.create_user(
            email=validated_data["email"], password=validated_data["password"]
        )
        user_obj.is_active = True
        user_obj.save()
        return user_obj


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


class ProfileDirectoriesSerializer(ProfileSerializer):
    class Meta(ProfileSerializer.Meta):
        fields = ["directories"]
