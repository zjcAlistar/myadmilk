# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('adWrist', '0015_auto_20151221_0037'),
    ]

    operations = [
        migrations.AddField(
            model_name='userlist',
            name='last_sync_time',
            field=models.DateField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
