from rest_framework import serializers
from .models import ContractAnalysis

class ContractAnalysisSerializer(serializers.ModelSerializer):
    file_path = serializers.FileField()

    class Meta:
        model = ContractAnalysis
        fields = ['id', 'file_path', 'file_type', 'risk_level', 'analysis_results', 'translated_results', 'uploaded_at']
        read_only_fields = ['risk_level', 'analysis_results', 'translated_results', 'uploaded_at']

    def validate_file_path(self, value):
        if not value.name.lower().endswith(('.pdf', '.png', '.jpg', '.jpeg')):
            raise serializers.ValidationError("Only PDF, PNG, JPG, or JPEG files are allowed.")
        return value