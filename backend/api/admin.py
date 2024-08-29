from django.contrib import admin
from .models import Cliente, Categoria, Questao, Alternativa

admin.site.register(Cliente)
admin.site.register(Categoria)
admin.site.register(Questao)
admin.site.register(Alternativa)