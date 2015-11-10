# encoding: utf-8
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from wechatpy.utils import check_signature
from wechatpy import parse_message
from wechatpy.replies import TextReply
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
import tools

TOKEN = 'admilk'

@csrf_exempt
def test1(request):
    print('!!!!!!')
    if request.method == 'GET':
        signature = request.GET.get('signature')
        timestamp = request.GET.get('timestamp')
        nonce = request.GET.get('nonce')
        echo_str = request.GET.get('echostr')
        check_signature(TOKEN, signature, timestamp, nonce)
        print('!!!')
        return HttpResponse(echo_str)
    elif request.method == 'POST':
        body = request.body
        msg = parse_message(body)
        print(msg.content)
        print(msg.source)
        print(msg.target)
        rep = TextReply()
        rep.source = msg.target
        rep.target = msg.source
        rep.content = '<a href="http://www.baidu.com">草泥马</a>'
        repxml = rep.render()
        return HttpResponse(repxml)

def test(request):
    tools.customSendText('olLDfvzIL2dJYDtHjmf4Pq4y60Pk','hello')