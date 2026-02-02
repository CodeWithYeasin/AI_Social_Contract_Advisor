from django.contrib import admin
from .models import ContractAnalysis

@admin.register(ContractAnalysis)
class ContractAnalysisAdmin(admin.ModelAdmin):
    list_display = ('user', 'file_type', 'risk_level', 'uploaded_at')
    list_filter = ('file_type', 'risk_level', 'uploaded_at')
    search_fields = ('user__username', 'file_path')
    readonly_fields = ('uploaded_at', 'analysis_results', 'translated_results')