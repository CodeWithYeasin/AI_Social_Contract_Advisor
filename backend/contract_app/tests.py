from transformers import pipeline

classifier = pipeline("sentiment-analysis")
print(classifier("Hello world"))
import torch
import torchvision
from transformers import pipeline

print(torch.__version__)
print(torchvision.__version__)
print(pipeline)
