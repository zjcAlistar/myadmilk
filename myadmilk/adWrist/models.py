from django.db import models

# Create your models here.
class userlist(models.Model):
    user_open_id = models.CharField(max_length=128)
    user_age = models.IntegerField(default=-1)
    user_sex = models.IntegerField(default=0)
    user_height = models.IntegerField(default=-1)
    user_weight = models.IntegerField(default=-1)
    user_confirmed = models.BooleanField(default=False)
    user_step_goal = models.IntegerField(default=20000)
    user_dist_goal = models.IntegerField(default=1000)
    user_calorie_goal = models.IntegerField(default=2000)
    user_remind = models.BooleanField(default=False)


class sportrecords(models.Model):
    sportrecords_person_id = models.ForeignKey(userlist, related_name='personid')
    sportrecords_start_time = models.DateTimeField(auto_now_add=True)
    sportrecords_end_time = models.DateTimeField(auto_now_add=True)
    sportrecords_sport_type = models.CharField(max_length=128)
    sportrecords_quantity = models.IntegerField(default=0)
    sportrecords_calorie = models.IntegerField(default=0)
    sportrecords_step_goal = models.IntegerField(default=20000)
    sportrecords_dist_goal = models.IntegerField(default=1000)
    sportrecords_calorie_goal = models.IntegerField(default=2000)