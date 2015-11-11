# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('adWrist', '0002_sportrecords'),
    ]

    operations = [
        migrations.AddField(
            model_name='userlist',
            name='user_comfirmed',
            field=models.BooleanField(default=False),
        ),
    ]
