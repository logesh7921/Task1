from flask import Flask, request, jsonify, render_template
from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM

app = Flask(__name__)

# Use a pipeline as a high-level helper
pipe = pipeline("text-generation", model="openai-community/gpt2")

# Load model directly
tokenizer = AutoTokenizer.from_pretrained("openai-community/gpt2")
model = AutoModelForCausalLM.from_pretrained("openai-community/gpt2")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    input_text = request.form['input_text']
    max_length = int(request.form.get('max_length', 50))
    num_return_sequences = int(request.form.get('num_return_sequences', 1))
    
    # Generate text using the pipeline
    response = pipe(input_text, max_length=max_length, num_return_sequences=num_return_sequences)
    
    generated_texts = [res['generated_text'] for res in response]
    return jsonify(generated_texts)

if __name__ == "__main__":
    app.run(debug=True)
