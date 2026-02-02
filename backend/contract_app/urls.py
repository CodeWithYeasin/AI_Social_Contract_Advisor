# contract_app/urls.py
from django.urls import path
from .views import ContractAnalysisView

app_name = 'contract_app'

urlpatterns = [
    path('analyze/', ContractAnalysisView.as_view(), name='contract_analysis'),
]