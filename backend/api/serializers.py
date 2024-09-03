from rest_framework import serializers
from .models import Cliente, Questao, Alternativa, Categoria

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class AlternativaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alternativa
        fields = ['id', 'nome', 'correta']

class QuestaoSerializer(serializers.ModelSerializer):
    alternativas = serializers.SerializerMethodField()
    categoria = CategoriaSerializer(many=True, read_only=True)

    class Meta:
        model = Questao
        fields = ["id", "pergunta", "alternativas", "categoria"]
    
    def get_alternativas(self, instance):
        alternativas = Alternativa.objects.filter(questao=instance)
        return alternativas.distinct().values()

class ClienteSerializer(serializers.ModelSerializer):
    questoes_feitas = QuestaoSerializer(many=True, read_only=True)
    class Meta:
        model = Cliente
        fields = '__all__'