# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('adWrist', '0006_auto_20151126_2011'),
    ]

    operations = [
        migrations.AddField(
            model_name='userlist',
            name='user_password',
            field=models.CharField(max_length=128, default=123456),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userlist',
            name='user_username',
            field=models.CharField(max_length=128, default='test'),
            preserve_default=False,
        ),
    ]
