from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

tokenizer = AutoTokenizer.from_pretrained("google/mt5-small", use_fast=False)
model = AutoModelForSeq2SeqLM.from_pretrained("google/mt5-small")

def translate_to_bangla(text: str) -> str:
    prompt = f"translate English to Bengali: {text}"
    input_ids = tokenizer(prompt, return_tensors="pt", max_length=512, truncation=True).input_ids
    output_ids = model.generate(input_ids, max_length=100)
    translated = tokenizer.decode(output_ids[0], skip_special_tokens=True)
    return translated
