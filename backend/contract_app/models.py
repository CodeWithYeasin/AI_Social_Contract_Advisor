from django.db import models
from django.contrib.auth.models import User

class ContractAnalysis(models.Model):
    FILE_TYPE_CHOICES = (
        ('pdf', 'PDF'),
        ('image', 'Image'),
    )
    RISK_LEVEL_CHOICES = (
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file_path = models.FileField(upload_to='uploads/')
    file_type = models.CharField(max_length=10, choices=FILE_TYPE_CHOICES)
    risk_level = models.CharField(max_length=10, choices=RISK_LEVEL_CHOICES)
    analysis_results = models.JSONField()  # Store clause classification results
    translated_results = models.TextField(blank=True)  # Store translated results
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.file_type} - {self.uploaded_at}"