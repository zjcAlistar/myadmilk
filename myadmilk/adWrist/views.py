# encoding: utf-8
from django.shortcuts import render,render_to_response
from django.template import RequestContext
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from wechatpy.utils import check_signature
from wechatpy import parse_message
from wechatpy.replies import TextReply
from django.views.decorators.csrf import csrf_exempt
from adWrist.models import userlist
# Create your views here.
import tools

TOKEN = 'admilk'

@csrf_exempt
def handleMsg(request):
    if request.method == 'GET':
        signature = request.GET.get('signature')
        timestamp = request.GET.get('timestamp')
        nonce = request.GET.get('nonce')
        echo_str = request.GET.get('echostr')
        check_signature(TOKEN, signature, timestamp, nonce)
        return HttpResponse(echo_str)
    elif request.method == 'POST':
        body = request.body
        msg = parse_message(body)
        rep = TextReply()
        rep.source = msg.target
        rep.target = msg.source
        print(msg.type)
        if msg.type == 'event':
            if msg.event == 'click':
                if msg.key == 'change_info':
                    rep.content = '请点击下面的链接修改信息\n<a href="http://59.66.139.224/showinfo?openID= '+ msg.source + '">修改信息</a>'
        else:
            rep.content = '<a href="http://learn.tsinghua.edu.cn">草泥马</a>'
        repxml = rep.render()
        return HttpResponse(repxml)

def showInfopage(request):
    openID = request.GET.get('openID')
    return render_to_response('personalInfo.html',{'openID':openID },context_instance=RequestContext(request))

def changeInfo(request):
    if request.method == 'GET':
        openID = request.GET.get('openID')
        sex = request.GET.get('sex')
        age = request.GET.get('age')
        height = request.GET.get('height')
        weight = request.GET.get('weight')
        newuser = userlist(
            user_open_id  =  openID,
            user_age = age,
            user_sex = sex,
            user_height = height,
            user_weight = weight
        )
        newuser.save()
        return HttpResponse('success')

def test(request):
    tools.customSendText('olLDfvzIL2dJYDtHjmf4Pq4y60Pk','hello')

