from django.db import models

# Create your models here.
class userlist(models.Model):
    user_open_id = models.CharField(max_length=128)
    user_age = models.IntegerField(default = -1)
    user_sex = models.BooleanField(default = True)
    user_height = models.IntegerField(default = -1)
    user_weight = models.IntegerField(default = -1)