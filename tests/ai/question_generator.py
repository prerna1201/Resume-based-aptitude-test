import json

from .gemini_client import ask_gemini
from .prompt_builder import build_prompt


def generate_ai_questions(skills):
    prompt = build_prompt(skills)

    response = ask_gemini(prompt)

    # Remove markdown formatting if present
    response = response.replace("```json", "").replace("```", "").strip()

    try:
        questions = json.loads(response)
        return questions

    except json.JSONDecodeError:
        print("Gemini Response:")
        print(response)
        raise Exception("Gemini returned invalid JSON")