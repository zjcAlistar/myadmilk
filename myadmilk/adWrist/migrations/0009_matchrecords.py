# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('adWrist', '0008_userlist_last_remind_time'),
    ]

    operations = [
        migrations.CreateModel(
            name='matchrecords',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, serialize=False, verbose_name='ID')),
                ('matchrecords_id', models.IntegerField(default=0)),
                ('matchrecords_originator', models.BooleanField()),
                ('matchrecords_matchtype', models.CharField(max_length=128)),
                ('matchrecords_matchstate', models.IntegerField(default=0)),
                ('matchrecords_messageread', models.BooleanField(default=False)),
                ('matchrecords_start_time', models.DateTimeField(auto_now_add=True)),
                ('matchrecords_end_time', models.DateTimeField(auto_now_add=True)),
                ('matchrecords_steps', models.IntegerField(default=0)),
                ('matchrecords_target', models.IntegerField(default=0)),
                ('matchrecords_relate_person', models.ForeignKey(related_name='related', to='adWrist.userlist')),
            ],
        ),
    ]
