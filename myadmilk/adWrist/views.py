# encoding: utf-8
from django.shortcuts import render,render_to_response
from django.template import RequestContext
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from wechatpy.utils import check_signature
from wechatpy import parse_message
from wechatpy.replies import TextReply
from django.views.decorators.csrf import csrf_exempt
from adWrist.models import userlist,sportrecords
from datetime import *
# Create your views here.
import tools

serverIP = 'http://59.66.139.66/'
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
        if msg.type == 'event':
            if msg.event == 'click':
                print(msg.key)
                if msg.key == 'change_info':
                    rep.content = '请点击下面的链接修改信息\n<a href="'+serverIP+'showinfo?openID='+ msg.source + '">修改信息</a>'
                elif msg.key == 'sports_advice':
                    rep.content = recommendPlan(msg.source)
                elif msg.key == 'view_info':
                    rep.content = getInfo(msg.source)
                elif msg.key == 'add_test':
                    rep.content = addTest(msg.source)
                elif msg.key == 'show_today':
                    rep.content = getDataToday(msg.source)
                elif msg.key == 'show_history':
                    rep.content = '请点击下面的链接进行查询\n<a href="'+serverIP+'showhistory?openID='+ msg.source + '">查看以往数据</a>'
            elif msg.event == 'subscribe':
                rep.content = createNewUser(msg.source)
            else:
                rep.content = '!!!'
        else:
            rep.content = '<a href="http://learn.tsinghua.edu.cn">你好</a>'
        repxml = rep.render()
        return HttpResponse(repxml)

def createNewUser(openID):
    try:
        userlist.objects.get(user_open_id=openID)
    except:
        new_user = userlist(
            user_open_id = openID
        )
        new_user.save()
        return  '欢迎你，新用户'
    else:
        return '欢迎你，老朋友'

def showInfopage(request):
    openID = request.GET.get('openID')
    return render_to_response('personalInfo.html',{'openID':openID },context_instance=RequestContext(request))

def addTest(openID):
    try:
        cur_user = userlist.objects.get(user_open_id = openID)
    except:
        rep = '好像出问题了，请填写信息'
    else:
        print(openID)
        date1 = datetime.now()
        date2 = datetime.now()
        print('!!!')
        new_record1 = sportrecords(
            sportrecords_person_id = cur_user,
            sportrecords_sport_type = '慢跑',
            sportrecords_quantity = 2000,
            sportrecords_calorie = 500
        )
        new_record2 = sportrecords(
            sportrecords_person_id = cur_user,
            sportrecords_sport_type = '走路',
            sportrecords_quantity = 1000,
            sportrecords_calorie = 200
        )
        new_record1.save()
        new_record2.save()
        new_record1.sportrecords_end_time = date1
        new_record2.sportrecords_end_time = date2
        new_record1.save()
        new_record2.save()
        rep = '添加成功'
    return rep

def getDataToday(openID):
    try:
        cur_user = userlist.objects.get(user_open_id = openID)
    except:
        rep = '好像出问题了，请填写信息'
    else:
        cur_data = sportrecords.objects.filter(sportrecords_person_id = cur_user, sportrecords_end_time__startswith = datetime.today().date())
        if cur_data :
            walk_quantity = 0
            slow_run_quantity = 0
            walk_calorie = 0
            slow_run_calorie = 0
            for single_data in cur_data:
                if single_data.sportrecords_sport_type == '慢跑':
                    slow_run_quantity += single_data.sportrecords_quantity
                    slow_run_calorie += single_data.sportrecords_calorie
                elif single_data.sportrecords_sport_type == '走路':
                    walk_quantity += single_data.sportrecords_quantity
                    walk_calorie += single_data.sportrecords_calorie
            rep = '您今天慢跑:\n'+str(slow_run_quantity)+'步\n消耗卡路里:\n'+str(slow_run_calorie)+'大卡\n您今天走路:\n'+str(walk_quantity)+'步\n消耗卡路里:\n'+str(walk_calorie)+'大卡'
        else:
            rep = '没查到数据'
    return rep

def getInfo(openID):
    try:
        cur_user = userlist.objects.get(user_open_id=openID)
    except userlist.DoesNotExist:
        rep = '您还没有填写个人信息'
    else:
        if cur_user.user_comfirmed:
            age = cur_user.user_age
            if cur_user.user_sex:
                sex = '男'
            else:
                sex = '女'
            weight = cur_user.user_weight
            height = cur_user.user_height
            rep = '您的年龄:'+str(age)+'\n您的性别:'+sex+'\n您的身高:'+str(height)+'cm\n您的体重:'+str(weight)+'kg'
        else:
            rep = '您还没有填写个人信息'
    return rep

def recommendPlan(openID):
    try:
        cur_user = userlist.objects.get(user_open_id=openID)
    except userlist.DoesNotExist:
        plan = '您还没有填写个人信息'
    else:
        if cur_user.user_comfirmed:
            if cur_user.user_sex:
                bmr = 66 + 13.7*cur_user.user_weight + 5*cur_user.user_height - 6.8*cur_user.user_age
            else:
                bmr = 655 + 9.6*cur_user.user_weight + 1.8*cur_user.user_height - 4.7*cur_user.user_age
            bmi = cur_user.user_weight*10000/(cur_user.user_height*cur_user.user_height)
            if bmi < 18.5:
                fatflag = 0
                msg = "体重过小，不宜减肥"
            elif bmi>=18.5 and bmi<24.5:
                msg = "体重正常，建议维持"
                fatflag = 1
            elif bmi>25 and bmi<32:
                msg = "超重，注意减肥"
                fatflag = 2
            else:
                msg = "严重超重"
                fatflag = 3
            if fatflag >= 2:
                caladvise = bmr * 0.55
            else:
                caladvise = bmr * 0.375
            rundistance = caladvise*1.6/100
            walkdistance = caladvise/52
            plan = "您的身体状况是：" + msg + "\n每天建议额外消耗:" + str(int(caladvise)) + "大卡\n即慢跑：" + str(int(rundistance)) + "公里\n或走路：" + str(int(walkdistance)) + "公里\n"
        else:
            plan = '您还没有填写个人信息'
        return plan

def changeInfo(request):
    if request.method == 'GET':
        openID = request.GET.get('openID')
        sex = request.GET.get('sex')
        age = request.GET.get('age')
        height = request.GET.get('height')
        weight = request.GET.get('weight')
        try:
            cur_user = userlist.objects.get(user_open_id=openID)
        except userlist.DoesNotExist:
            newuser = userlist(
                user_open_id  =  openID,
                user_age = age,
                user_sex = sex,
                user_height = height,
                user_weight = weight,
                user_comfirmed = True
            )
            newuser.save()
        else:
            cur_user.user_age = age
            cur_user.user_sex = sex
            cur_user.user_height = height
            cur_user.user_weight = weight
            cur_user.user_comfirmed = True
            cur_user.save()
        return HttpResponse('success')

def showHistory(request):
    openID = request.GET.get('openID')
    return render_to_response('sportdata_check_previous.html',{'openID':openID },context_instance=RequestContext(request))

def checkPrevious(request):
    if request.method == 'GET':
        openID = request.GET.get('openID')
        year = request.GET.get('year')
        month = request.GET.get('month')
        day = request.GET.get('day')
        try:
            cur_user = userlist.objects.get(user_open_id = openID)
        except:
            rep = {"flag":'failed'}
        else:
            print(year,month,day)
            cur_data = sportrecords.objects.filter(sportrecords_person_id = cur_user, sportrecords_end_time__startswith = date(int(year),int(month),int(day)))
            print(year,month,day)
            if cur_data :
                walk_quantity = 0
                slow_run_quantity = 0
                walk_calorie = 0
                slow_run_calorie = 0
                for single_data in cur_data:
                    if single_data.sportrecords_sport_type == '慢跑':
                        slow_run_quantity += single_data.sportrecords_quantity
                        slow_run_calorie += single_data.sportrecords_calorie
                    elif single_data.sportrecords_sport_type == '走路':
                        walk_quantity += single_data.sportrecords_quantity
                        walk_calorie += single_data.sportrecords_calorie
                rep = {"flag":'success',"sporttype":'走路',"quantity":walk_quantity,"calorie":walk_calorie}
            else:
                rep = {"flag":'failed'}
        return JsonResponse(rep)

def test(request):
    tools.customSendText('olLDfvzIL2dJYDtHjmf4Pq4y60Pk','hello')

