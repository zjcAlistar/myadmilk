# encoding: utf-8

import urllib.parse
import urllib.request

def getnewData(starttime, endtime, user):
    if user >= 100:
        params = urllib.parse.urlencode({'startTime': starttime, 'endTime': endtime})
    else:
        params = urllib.parse.urlencode({'startTime': starttime, 'endTime': endtime, 'user': user})
    result = urllib.request.urlopen("http://wrist.ssast2015.com/bongdata?%s" % params)
    cur_data = result.read()
    for single_data in cur_data:
        try:
            cur_user = userlist.objects.get(id=user+1)
        except userlist.DoesNotExist:
            return
        new_record = sportrecords(
            sportrecords_person_id=cur_user,
            sportrecords_start_time=single_data.startTime,
            sportrecords_end_time=single_data.endTime,
            sportrecords_type=single_data.type,
            sportrecords_subtype=single_data.subType,
            sportrecords_quantity=single_data.steps,
            sportrecords_calorie=single_data.calories,
            sportrecords_dist=single_data.distance
        )
        new_record.save()


# getnewData("2015-11-25 00:00:00","2015-11-25 23:59:59",0)