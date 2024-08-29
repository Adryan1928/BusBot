from django.db import models


class Categoria(models.Model):
    nome = models.CharField(max_length=255)

    def __str__(self):
        return self.nome

class Questao(models.Model):
    pergunta = models.TextField()
    categoria = models.ManyToManyField(Categoria)

    def __str__(self):
        return self.pergunta

class Alternativa(models.Model):
    nome = models.TextField()
    correta = models.BooleanField()
    questao = models.ForeignKey(Questao, on_delete=models.CASCADE)

    def __str__(self):
        return self.nome

class Cliente(models.Model):
    nome = models.CharField(max_length=255)
    numero = models.CharField(max_length=255, unique=True)
    questoes_feitas = models.ManyToManyField(Questao, blank=True)

    def __str__(self):
        return self.nome