# encoding: utf-8

__author__ = "chendaxixi"
import json
from wechatpy.client import WeChatClient

API_ID = "wx63d7c5403fa29607"
API_SECRET = "d4624c36b6795d1d99dcf0547af5443d"

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
