# encoding: utf-8

__author__ = "chendaxixi"
import json
from wechatpy.client import WeChatClient
import config

serverIP = config.serverIP
API_ID = config.API_ID
API_SECRET = config.API_SECRET

menu = {"button":
            [{"name":"个人信息","sub_button":[
                {"type":"click","name":"运动建议","key":"sports_advice"},
                {"type":"view","name":"修改信息","url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid="
                                                   + API_ID + "&redirect_uri=" + serverIP +
                                                   "showinfo&response_type=code&scope=snsapi_base&state=1#wechat_redirect"},
                {"type":"click","name":"查看信息","key":"view_info"}]},
             {"name":"运动数据","sub_button":[
                 {"type":"click","name":"添加测试","key":"add_test"},
                 {"type":"click","name":"查看今日","key":"show_today"},
                 {"type":"view","name":"查看以往","url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid="
                                                    + API_ID + "&redirect_uri=" + serverIP +
                                                    "showhistory&response_type=code&scope=snsapi_base&state=1#wechat_redirect"},
                 {"type":"view","name":"测试OAuth","url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid="
                                                       + API_ID + "&redirect_uri=" + serverIP +
                                                       "oauth&response_type=code&scope=snsapi_base&state=1#wechat_redirect" },
                 {"type":"view","name":"测试图表","url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid="
                                                       + API_ID + "&redirect_uri=" + serverIP +
                                                    "showchart&response_type=code&scope=snsapi_base&state=1#wechat_redirect" }]}]}


def menuCreate(body):
    client = WeChatClient(API_ID, API_SECRET)
    client.menu.delete()
    return client.menu.create(body)


def menuQuery():
    client = WeChatClient(API_ID, API_SECRET)
    return client.menu.get()


def menuDelete():
    client = WeChatClient(API_ID, API_SECRET)
    return client.menu.delete()

def customSendText(user, content):
    client = WeChatClient(API_ID, API_SECRET)
    return client.message.send_text(user, content)


def customSendImage(user, filename):
    f = open(filename)
    client = WeChatClient(API_ID, API_SECRET)
    res =  client.media.upload("image", f)
    f.close()
    data = json.loads(res)
    try:
        return client.message.send_image(user, data["media_id"])
    except:
        return res


def getStat(deviceId):
    client = WeChatClient(API_ID, API_SECRET)
    return client.device.get_stat(deviceId)


def getOpenId(deviceType, deviceId):
    client = WeChatClient(API_ID, API_SECRET)
    return client.device.get_user_id(deviceType, deviceId)


def transMsg(deviceType, deviceId, user, content):
    client = WeChatClient(API_ID, API_SECRET)
    return client.device.send_message(deviceType, deviceId, user, content)


def createQrByDeviceId(deviceId):
    client = WeChatClient(API_ID, API_SECRET)
    res = client.device.create_qrcode([deviceId])
    try:
        ticket = json.loads(res)["code_list"][0]["ticket"]
        #TODO
        return ticket
    except:
        return res

if __name__ == "__main__":
    print("python-wechat tools modified by chendaxixi")
