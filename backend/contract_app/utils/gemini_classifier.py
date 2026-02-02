from transformers import pipeline
import fitz  # PyMuPDF

# Load zero-shot classification pipeline
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

# Define your 20 clause labels
CLAUSE_LABELS = [
    "Payment Clause", "Liability Clause", "Termination Clause", "Duration Clause",
    "Confidentiality Clause", "Governing Law Clause", "Dispute Resolution Clause",
    "Force Majeure Clause", "Indemnification Clause", "Intellectual Property Clause",
    "Assignment Clause", "Severability Clause", "Entire Agreement Clause",
    "Amendment Clause", "Notice Clause", "Warranty Clause", "Waiver Clause",
    "Audit Clause", "Compliance Clause", "Unknown Clause"
]

def extract_text_from_pdf(path):
    doc = fitz.open(path)
    full_text = ""
    for page in doc:
        full_text += page.get_text()
    return full_text

def split_into_clauses(text):
    import re
    # Naive split based on common clause headings
    return re.split(r'\n?(Clause|Section|Article|Term)[^\n]*\n+', text)

def classify_clauses(text):
    clauses = split_into_clauses(text)
    results = []
    for clause in clauses:
        if len(clause.strip()) < 30:
            continue  # skip short noise
        prediction = classifier(clause, candidate_labels=CLAUSE_LABELS)
        label = prediction["labels"][0]
        score = prediction["scores"][0]
        results.append({
            "text": clause.strip(),
            "label": label,
            "score": round(score, 3)
        })
    return results
