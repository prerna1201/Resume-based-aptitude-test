from .gemini_client import ask_gemini


def test():

    prompt = """
Generate one Python multiple choice question.

Return only the question.
"""

    print(
        ask_gemini(prompt)
    )


if __name__ == "__main__":
    test()