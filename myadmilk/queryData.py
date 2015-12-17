# encoding: utf-8

import urllib.parse
import urllib.request

def getnewData(starttime, endtime, user):
    if user >= 100:
        params = urllib.parse.urlencode({'startTime': starttime, 'endTime': endtime})
    else:
        params = urllib.parse.urlencode({'startTime': starttime, 'endTime': endtime, 'user': user})
    result = urllib.request.urlopen("http://wrist.ssast2015.com/bongdata?%s" % params)
    print (result.read())

getnewData("2015-11-25 00:00:00","2015-11-25 23:59:59",0)