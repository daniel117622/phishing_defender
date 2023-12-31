from rest_framework import serializers
from base.models import URLRequest

class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = URLRequest
        fields = ['url', 'last_checked', 'vulnerable', 'lvl']
        