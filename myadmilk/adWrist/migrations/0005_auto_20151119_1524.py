# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('adWrist', '0004_auto_20151114_1840'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userlist',
            name='user_sex',
            field=models.IntegerField(default=0),
        ),
    ]
