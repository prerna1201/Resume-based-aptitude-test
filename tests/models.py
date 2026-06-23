from django.db import models


class Question(models.Model):

    CATEGORY_CHOICES = [
        ("python", "Python"),
        ("java", "Java"),
        ("c", "C"),
        ("c++", "C++"),
        ("sql", "SQL"),
        ("html", "HTML"),
        ("css", "CSS"),
        ("javascript", "JavaScript"),
        ("react", "React"),
        ("django", "Django"),
        ("aptitude", "Aptitude"),
    ]

    DIFFICULTY_CHOICES = [
        ("easy", "Easy"),
        ("medium", "Medium"),
        ("hard", "Hard"),
    ]

    question_text = models.TextField()

    option1 = models.CharField(max_length=255)
    option2 = models.CharField(max_length=255)
    option3 = models.CharField(max_length=255)
    option4 = models.CharField(max_length=255)

    correct_answer = models.CharField(max_length=255)

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES
    )

    difficulty = models.CharField(
        max_length=20,
        choices=DIFFICULTY_CHOICES,
        default="easy"
    )

    def __str__(self):
        return self.question_text[:50]


class Test(models.Model):

    title = models.CharField(max_length=200)

    skills = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title


class Result(models.Model):

    test = models.ForeignKey(
        Test,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    score = models.IntegerField()

    total_questions = models.IntegerField(
        default=0
    )

    submitted_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.score}"
    

    score = models.IntegerField()

    total_questions = models.IntegerField(
        default=0
    )

    submitted_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"Score: {self.score}/{self.total_questions}"