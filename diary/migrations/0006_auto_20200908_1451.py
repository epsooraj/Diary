# Generated by Django 3.1.1 on 2020-09-08 14:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diary', '0005_auto_20200906_0840'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='diary',
            options={'ordering': ('-date',), 'verbose_name_plural': 'diaries'},
        ),
        migrations.AlterField(
            model_name='diary',
            name='date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
