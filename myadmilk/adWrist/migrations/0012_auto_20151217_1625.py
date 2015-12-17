# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('adWrist', '0011_auto_20151213_1751'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userlist',
            name='user_password',
        ),
        migrations.RemoveField(
            model_name='userlist',
            name='user_username',
        ),
        migrations.AddField(
            model_name='sportrecords',
            name='sportrecords_dist',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='sportrecords',
            name='sportrecords_points',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='sportrecords',
            name='sportrecords_subtype',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='sportrecords',
            name='sportrecords_type',
            field=models.IntegerField(default=0),
        ),
    ]
