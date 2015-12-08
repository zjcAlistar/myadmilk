# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('adWrist', '0009_matchrecords'),
    ]

    operations = [
        migrations.AddField(
            model_name='matchrecords',
            name='matchrecords_title',
            field=models.CharField(max_length=128, default='比赛'),
            preserve_default=False,
        ),
    ]
