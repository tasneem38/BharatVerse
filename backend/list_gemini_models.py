import google.generativeai as genai

genai.configure(api_key="AIzaSyAtShravy4FAMzYL-Ca7TBNGJQW_0P-qAQ")

def list_gemini_models():
    try:
        models = genai.list_models()
        print("Available Gemini Models:")
        for model in models:
            name = model.name
            methods = model.supported_generation_methods
            print(f"- {name}: methods = {methods}")
    except Exception as e:
        print(f"Error listing models: {e}")

if __name__ == "__main__":
    list_gemini_models()
