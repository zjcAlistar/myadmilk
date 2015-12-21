# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('adWrist', '0013_auto_20151217_1732'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='matchrecords',
            name='matchrecords_matchstate',
        ),
        migrations.RemoveField(
            model_name='matchrecords',
            name='matchrecords_messageread',
        ),
        migrations.RemoveField(
            model_name='sportrecords',
            name='sportrecords_sport_type',
        ),
        migrations.AddField(
            model_name='matchrecords',
            name='matchrecords_created',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='matchrecords',
            name='matchrecords_scored',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='sportrecords',
            name='sportrecords_step_goal',
            field=models.IntegerField(default=10000),
        ),
        migrations.AlterField(
            model_name='userlist',
            name='user_step_goal',
            field=models.IntegerField(default=10000),
        ),
    ]
