from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ContractAnalysisSerializer
from .models import ContractAnalysis
from .utils.gemini_classifier import classify_clauses, extract_text_from_pdf
from .utils.ocr import extract_text_from_file
from .utils.risk import detect_risk_level
from .utils.translate import translate_to_bangla
import os

class ContractAnalysisView(APIView):
    def post(self, request):
        serializer = ContractAnalysisSerializer(data=request.data)
        if serializer.is_valid():
            file_path = serializer.validated_data['file_path']
            file_type = 'pdf' if file_path.name.lower().endswith('.pdf') else 'image'
            
            # Extract text
            text = extract_text_from_file(file_path.path)
            if text == "[Unsupported file type]":
                return Response({"error": "Unsupported file type"}, status=status.HTTP_400_BAD_REQUEST)
            
            # Classify clauses
            analysis_results = classify_clauses(text)
            
            # Detect risk level
            risk_level = detect_risk_level(text)
            
            # Translate results to Bengali
            translated_results = ""
            for result in analysis_results:
                translated_text = translate_to_bangla(result['text'])
                translated_results += f"{result['label']}: {translated_text}\n"
            
            # Save to database
            contract_analysis = ContractAnalysis(
                user=request.user,
                file_path=file_path,
                file_type=file_type,
                risk_level=risk_level,
                analysis_results=analysis_results,
                translated_results=translated_results
            )
            contract_analysis.save()
            
            serializer = ContractAnalysisSerializer(contract_analysis)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)