HIGH_RISK_KEYWORDS = [
    "non-refundable", "cannot be cancelled", "perpetual", "lifetime", "termination fee", "waive your rights"
]
MEDIUM_RISK_KEYWORDS = [
    "auto-renew", "subject to change", "discretionary", "late payment fee"
]

def detect_risk_level(text: str) -> str:
    text = text.lower()
    for word in HIGH_RISK_KEYWORDS:
        if word in text:
            return "high"
    for word in MEDIUM_RISK_KEYWORDS:
        if word in text:
            return "medium"
    return "low"
