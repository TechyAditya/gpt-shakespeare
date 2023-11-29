from flask import Flask, render_template, request, jsonify

from gpt import runApp

app = Flask(__name__)

# def runApp(input_text, steps=1, temperature=0.7, top_k=40):
#     # time delay 2 seconds
#     import time
#     time.sleep(2)
#     return "The code runs perfectly"

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        data = request.get_json()
        input_text = data['input_text']
        steps = int(data['steps'])
        temperature = float(data['temperature'])
        top_k = int(data['top_k'])

        # Call your ML model function
        output = runApp(input_text, steps=steps, temperature=temperature, top_k=top_k)
        
        return jsonify({'result': output, 'error': None})
    
    return render_template('index.html')  # Render the webpage with the form

print("Flask app is running")

if __name__ == '__main__':
    app.run(debug=True)
