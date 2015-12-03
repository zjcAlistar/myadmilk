# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('adWrist', '0007_auto_20151201_2109'),
    ]

    operations = [
        migrations.AddField(
            model_name='userlist',
            name='last_remind_time',
            field=models.DateTimeField(default=datetime.datetime(2015, 12, 2, 18, 43, 40, 706925), auto_now_add=True),
            preserve_default=False,
        ),
    ]
