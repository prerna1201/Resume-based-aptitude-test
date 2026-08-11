import PyPDF2
from pathlib import Path
from docx import Document

def extract_text_from_resume(file_path):
    """Extract text from the PDF and DOCX formats accepted by the UI."""
    suffix = Path(file_path).suffix.lower()

    if suffix == ".docx":
        document = Document(file_path)
        return "\n".join(paragraph.text for paragraph in document.paragraphs)

    if suffix != ".pdf":
        raise ValueError("Only PDF and DOCX resumes are supported.")

    text = ""

    with open(file_path, "rb") as file:

        reader = PyPDF2.PdfReader(file)

        for page in reader.pages:
            text += page.extract_text() or ""

    return text


# Kept for imports from older code.
extract_text_from_pdf = extract_text_from_resume
