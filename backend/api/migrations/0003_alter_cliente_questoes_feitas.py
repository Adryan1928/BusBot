# Generated by Django 5.1 on 2024-08-29 10:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alternativa_categoria_questao_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cliente',
            name='questoes_feitas',
            field=models.ManyToManyField(blank=True, null=True, to='api.questao'),
        ),
    ]
