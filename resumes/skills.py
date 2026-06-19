SKILLS = [

    # Programming Languages
    "python", "java", "c", "c++", "c#", "javascript",
    "typescript", "go", "rust", "kotlin", "swift",
    "php", "ruby", "r", "matlab", "perl",

    # Web Development
    "html", "css", "bootstrap", "tailwind",
    "react", "nextjs", "angular", "vue",
    "nodejs", "express", "django", "flask",
    "fastapi", "spring boot", "laravel",

    # Databases
    "mysql", "postgresql", "mongodb",
    "sqlite", "oracle", "sql server",
    "redis", "cassandra", "firebase",

    # Data Science
    "numpy", "pandas", "matplotlib",
    "seaborn", "scikit-learn", "tensorflow",
    "keras", "pytorch", "xgboost",
    "data analysis", "data visualization",

    # AI / ML
    "machine learning",
    "deep learning",
    "nlp",
    "computer vision",
    "generative ai",
    "llm",
    "openai",
    "langchain",
    "rag",
    "prompt engineering",

    # Cloud
    "aws",
    "azure",
    "google cloud",
    "gcp",
    "cloud computing",

    # DevOps
    "docker",
    "kubernetes",
    "jenkins",
    "terraform",
    "ansible",
    "github actions",
    "ci/cd",

    # Version Control
    "git",
    "github",
    "gitlab",
    "bitbucket",

    # Mobile Development
    "android",
    "ios",
    "flutter",
    "react native",
    "xamarin",

    # Cyber Security
    "network security",
    "ethical hacking",
    "penetration testing",
    "vulnerability assessment",
    "owasp",
    "burp suite",
    "wireshark",
    "metasploit",
    "kali linux",

    # Networking
    "tcp/ip",
    "dns",
    "dhcp",
    "routing",
    "switching",
    "firewall",

    # Operating Systems
    "linux",
    "ubuntu",
    "windows server",
    "unix",

    # Testing
    "selenium",
    "pytest",
    "junit",
    "postman",
    "manual testing",
    "automation testing",

    # Data Engineering
    "hadoop",
    "spark",
    "kafka",
    "etl",
    "airflow",

    # ERP / Business
    "sap",
    "salesforce",
    "crm",
    "erp",

    # UI/UX
    "figma",
    "adobe xd",
    "photoshop",
    "illustrator",
    "wireframing",
    "prototyping",

    # Soft Skills
    "leadership",
    "communication",
    "teamwork",
    "problem solving",
    "critical thinking",
    "time management",
    "project management",
    "presentation skills",

    # Aptitude Related
    "quantitative aptitude",
    "logical reasoning",
    "verbal ability",
    "analytical skills",

    # Emerging Technologies
    "blockchain",
    "web3",
    "iot",
    "embedded systems",
    "robotics",
    "augmented reality",
    "virtual reality"
]
def extract_skills(text):
    text = text.lower()

    found_skills = []

    for skill in SKILLS:
        if skill.lower() in text:
            found_skills.append(skill)

    return found_skills