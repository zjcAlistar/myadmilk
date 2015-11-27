# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('adWrist', '0005_auto_20151119_1524'),
    ]

    operations = [
        migrations.AddField(
            model_name='sportrecords',
            name='sportrecords_calorie_goal',
            field=models.IntegerField(default=2000),
        ),
        migrations.AddField(
            model_name='sportrecords',
            name='sportrecords_dist_goal',
            field=models.IntegerField(default=1000),
        ),
        migrations.AddField(
            model_name='sportrecords',
            name='sportrecords_step_goal',
            field=models.IntegerField(default=20000),
        ),
        migrations.AddField(
            model_name='userlist',
            name='user_calorie_goal',
            field=models.IntegerField(default=2000),
        ),
        migrations.AddField(
            model_name='userlist',
            name='user_dist_goal',
            field=models.IntegerField(default=1000),
        ),
        migrations.AddField(
            model_name='userlist',
            name='user_remind',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userlist',
            name='user_step_goal',
            field=models.IntegerField(default=20000),
        ),
    ]
