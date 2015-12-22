# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('adWrist', '0016_userlist_last_sync_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userlist',
            name='last_sync_time',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
