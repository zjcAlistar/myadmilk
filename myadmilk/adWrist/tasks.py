# encoding: utf-8
from __future__ import absolute_import

from myadmilk.celery import app
from config import API_ID, API_SECRET,serverIP
from wechatpy.client import WeChatClient
from adWrist.models import userlist
from datetime import datetime, timedelta

@app.task
def remind_check():
    now = datetime.now()
    last_remind = now+timedelta(days=(-7))
    client = WeChatClient(API_ID, API_SECRET)
    remind_users = userlist.objects.filter(user_remind=True, last_remind_time__lte=last_remind)

    remind_openids = list(map(lambda x: x.user_open_id, remind_users))
    nums_of_reminds = len(remind_openids)
    if nums_of_reminds >= 2:
        client.message.send_mass_text(remind_openids,  '<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid='
                                  + API_ID + '&redirect_uri=' + serverIP +
                                  'showreport?&response_type=code&scope=snsapi_base&state=1#wechat_redirect">点此链接查看一周总结</a>')
    elif nums_of_reminds == 1:
        client.message.send_text(remind_openids[0], '<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid='
                                  + API_ID + '&redirect_uri=' + serverIP +
                                  'showrport?&response_type=code&scope=snsapi_base&state=1#wechat_redirect">点此链接查看一周总结</a>')
    else:
        print("no remind users!!")
    print('send end!!')
