from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MigoTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        # Добавляем роль пользователя в JSON-ответ
        data['role'] = self.user.role
        data['username'] = self.user.username
        
        return data

class MigoTokenObtainPairView(TokenObtainPairView):
    serializer_class = MigoTokenObtainPairSerializer
