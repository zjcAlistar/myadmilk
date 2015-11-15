# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('adWrist', '0003_userlist_user_comfirmed'),
    ]

    operations = [
        migrations.RenameField(
            model_name='sportrecords',
            old_name='sportrecords_strat_time',
            new_name='sportrecords_start_time',
        ),
        migrations.RenameField(
            model_name='userlist',
            old_name='user_comfirmed',
            new_name='user_confirmed',
        ),
    ]
