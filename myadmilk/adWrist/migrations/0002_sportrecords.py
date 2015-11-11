# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('adWrist', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='sportrecords',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('sportrecords_strat_time', models.DateTimeField(auto_now_add=True)),
                ('sportrecords_end_time', models.DateTimeField(auto_now_add=True)),
                ('sportrecords_sport_type', models.CharField(max_length=128)),
                ('sportrecords_quantity', models.IntegerField(default=0)),
                ('sportrecords_calorie', models.IntegerField(default=0)),
                ('sportrecords_person_id', models.ForeignKey(related_name='personid', to='adWrist.userlist')),
            ],
        ),
    ]
