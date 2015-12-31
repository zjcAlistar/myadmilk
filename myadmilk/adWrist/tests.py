# encoding: utf-8
from django.test import TestCase

# Create your tests here.
from django.contrib.auth.models import AnonymousUser, User
from django.test import RequestFactory

from .views import change_plan, create_match
from .models import userlist, matchrecords

class SimpleTest(TestCase):
    def setUp(self):
        # Every test needs access to the request factory.
        self.factory = RequestFactory()
        user = userlist.objects.create(user_open_id="olLDfvzIL2dJYDtHjmf4Pq4y60Pk")
        matchrecords.objects.create(matchrecords_originator=True,  matchrecords_matchtype="comp_distance", matchrecords_relate_person=user,
                                    matchrecords_id=10)

    def test_change_plan(self):
        # Create an instance of a GET request.
        request = self.factory.post('/changeplan/',{"openID": "olLDfvzIL2dJYDtHjmf4Pq4y60Pk", "daily_step": 1000, "daily_dist": 1000, "daily_cal": 1000})

        # Test my_view() as if it were deployed at /customer/details
        response = change_plan(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content.decode(), '修改成功')

        request = self.factory.post('/changeplan/',{"openID": "olLDfvzIL2dJYDtHjmf4Pq4y60Pk1", "daily_step": 1000, "daily_dist": 1000, "daily_cal": 1000})
        response = change_plan(request)
        self.assertEqual(response.content.decode(), '您还没有填写个人信息')

    def test_create_match(self):
        request = self.factory.post('/creatematch/',{"openID": "olLDfvzIL2dJYDtHjmf4Pq4y60Pk", "competitionID": 10, "competitiontype": "comp_distance", "datetime_start": "2015-12-31 20:00:00", "datetime_end": "2016-01-01 20:00:00", "competitionname": "测试比赛10"})
        response = create_match(request)
        self.assertEqual(response.content.decode(), '比赛创建成功!请点击右上角「分享到朋友圈」，与好友一试高下!')

        request = self.factory.post('/creatematch/',{"openID": "olLDfvzIL2dJYDtHjmf4Pq4y60Pk", "competitionID": 10, "competitiontype": "comp_distance", "datetime_start": "2015-12-31 20:00:00", "datetime_end": "2016-01-01 20:00:00", "competitionname": "测试比赛10"})
        response = create_match(request)
        self.assertEqual(response.content.decode(), '比赛已经创建')
