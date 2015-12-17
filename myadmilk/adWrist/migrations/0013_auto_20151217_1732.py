# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('adWrist', '0012_auto_20151217_1625'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sportrecords',
            name='sportrecords_points',
        ),
        migrations.AddField(
            model_name='userlist',
            name='user_points',
            field=models.IntegerField(default=0),
        ),
    ]
