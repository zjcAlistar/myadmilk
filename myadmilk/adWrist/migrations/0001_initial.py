# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='userlist',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('user_open_id', models.CharField(max_length=128)),
                ('user_age', models.IntegerField(default=-1)),
                ('user_sex', models.BooleanField(default=True)),
                ('user_height', models.IntegerField(default=-1)),
                ('user_weight', models.IntegerField(default=-1)),
            ],
        ),
    ]
