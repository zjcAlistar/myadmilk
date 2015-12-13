# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('adWrist', '0010_matchrecords_matchrecords_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='matchrecords',
            name='matchrecords_finish_flag',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='matchrecords',
            name='matchrecords_finish_time',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2015, 12, 13, 17, 51, 17, 506476)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='matchrecords',
            name='matchrecords_rank',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='sportrecords',
            name='sportrecords_dist_goal',
            field=models.IntegerField(default=10),
        ),
        migrations.AlterField(
            model_name='sportrecords',
            name='sportrecords_step_goal',
            field=models.IntegerField(default=5000),
        ),
        migrations.AlterField(
            model_name='userlist',
            name='user_dist_goal',
            field=models.IntegerField(default=10),
        ),
        migrations.AlterField(
            model_name='userlist',
            name='user_step_goal',
            field=models.IntegerField(default=5000),
        ),
    ]
