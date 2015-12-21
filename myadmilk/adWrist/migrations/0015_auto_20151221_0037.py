# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('adWrist', '0014_auto_20151220_2057'),
    ]

    operations = [
        migrations.AddField(
            model_name='userlist',
            name='user_avator',
            field=models.CharField(default='', max_length=512),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userlist',
            name='user_nick_name',
            field=models.CharField(default='', max_length=128),
            preserve_default=False,
        ),
    ]
