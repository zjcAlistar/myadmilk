from django.db import models

# Create your models here.

class userlist(models.Model):
    user_open_id = models.CharField(max_length=128)
    user_nick_name = models.CharField(max_length=128)
    user_avator = models.CharField(max_length=512)
    user_age = models.IntegerField(default=-1)
    user_sex = models.IntegerField(default=0)
    user_height = models.IntegerField(default=-1)
    user_weight = models.IntegerField(default=-1)
    user_confirmed = models.BooleanField(default=False)
    user_step_goal = models.IntegerField(default=10000)
    user_dist_goal = models.IntegerField(default=10)
    user_calorie_goal = models.IntegerField(default=2000)
    user_points = models.IntegerField(default=0)
    user_remind = models.BooleanField(default=False)
    last_remind_time = models.DateTimeField(auto_now_add=True)
    last_sync_time = models.DateTimeField(auto_now_add=True)


class sportrecords(models.Model):
    sportrecords_person_id = models.ForeignKey(userlist, related_name='personid')
    sportrecords_start_time = models.DateTimeField(auto_now_add=True)
    sportrecords_end_time = models.DateTimeField(auto_now_add=True)
    sportrecords_quantity = models.IntegerField(default=0)
    sportrecords_calorie = models.IntegerField(default=0)
    sportrecords_dist = models.IntegerField(default=0)
    sportrecords_type = models.IntegerField(default=0)
    sportrecords_subtype = models.IntegerField(default=0)
    sportrecords_step_goal = models.IntegerField(default=10000)
    sportrecords_dist_goal = models.IntegerField(default=10)
    sportrecords_calorie_goal = models.IntegerField(default=2000)


class matchrecords(models.Model):
    matchrecords_id = models.IntegerField(default=0)
    matchrecords_title = models.CharField(max_length=128)
    matchrecords_relate_person = models.ForeignKey(userlist, related_name='related')
    matchrecords_originator = models.BooleanField()
    matchrecords_matchtype = models.CharField(max_length=128)
    matchrecords_start_time = models.DateTimeField(auto_now_add=True)
    matchrecords_end_time = models.DateTimeField(auto_now_add=True)
    matchrecords_created = models.BooleanField(default=False)
    matchrecords_scored = models.BooleanField(default=False)
    matchrecords_steps = models.IntegerField(default=0)
    matchrecords_target = models.IntegerField(default=0)
    matchrecords_finish_time = models.DateTimeField(auto_now_add=True)
    matchrecords_finish_flag = models.BooleanField(default=False)
    matchrecords_rank = models.IntegerField(default=0)
