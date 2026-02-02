import pytesseract
from PIL import Image
import fitz  # PyMuPDF

def extract_text_from_file(path):
    if path.lower().endswith(('.png', '.jpg', '.jpeg')):
        return pytesseract.image_to_string(Image.open(path))
    elif path.lower().endswith('.pdf'):
        text = ""
        doc = fitz.open(path)
        for page in doc:
            text += page.get_text()
        return text
    else:
        return "[Unsupported file type]"
