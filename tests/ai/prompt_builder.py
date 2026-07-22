def build_prompt(skills):
    skills_text = ", ".join(skills)

    return f"""
You are an expert technical interviewer.

Generate exactly 20 multiple-choice questions.

Candidate Skills:
{skills_text}

Requirements:
- Mix technical and aptitude questions.
- Medium difficulty.
- 4 options for each question.
- Exactly one correct answer.
- No duplicate questions.
- Questions should be practical and interview-oriented.
- Do NOT include explanations.
- Return ONLY valid JSON.
- Do NOT wrap the JSON inside ```json```.

Return this exact format:

[
  {{
    "question": "What is Python?",
    "option1": "Programming Language",
    "option2": "Database",
    "option3": "Operating System",
    "option4": "Browser",
    "correct_answer": "Programming Language",
    "category": "Python"
  }}
]
"""