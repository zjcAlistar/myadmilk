# encoding: utf-8
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponse, JsonResponse, Http404
from wechatpy.utils import check_signature
from wechatpy import parse_message
from wechatpy.replies import TextReply
from django.views.decorators.csrf import csrf_exempt
from adWrist.models import userlist, sportrecords, matchrecords
from datetime import *
from urllib.request import *
import json
import config
import random
from wechatpy.client import WeChatClient
# Create your views here.


serverIP = config.serverIP
API_ID = config.API_ID
API_SECRET = config.API_SECRET
TOKEN = config.TOKEN


@csrf_exempt
def handle_msg(request):
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
                if msg.key == 'sports_advice':
                    rep.content = recommend_plan(msg.source)
                elif msg.key == 'view_info':
                    rep.content = get_info(msg.source)
                elif msg.key == 'add_test':
                    rep.content = add_test(msg.source)
                elif msg.key == 'show_today':
                    rep.content = get_datatoday(msg.source)
                elif msg.key == 'change_remind':
                    rep.content = set_remind(msg.source)
                elif msg.key == 'build_match':
                    rep.content = build_match(msg.source)
            elif msg.event == 'subscribe':
                rep.content = create_newuser(msg.source)
            else:
                rep.content = '!!!'
        else:
            client = WeChatClient(API_ID, API_SECRET)
            cur_user = client.user.get(msg.source,lang=u'zh_CN')
            nickname = cur_user['nickname']
            rep.content = '你的用户名是'+nickname
        repxml = rep.render()
        return HttpResponse(repxml)


def create_newuser(openID):
    try:
        userlist.objects.get(user_open_id=openID)
    except userlist.DoesNotExist:
        new_user = userlist(
            user_open_id = openID
        )
        new_user.save()
        return '欢迎你，新用户'
    else:
        return '欢迎你，老朋友'


def show_info_page(request):
    if request.method == 'GET':
        code = request.GET.get('code')
        openID = get_openid(code)
        if openID == 0:
            raise Http404()
        else:
            return render_to_response('personalInfo.html',{'openID':openID },context_instance=RequestContext(request))
    else:
        raise Http404()


def add_test_new(openID):
    try:
        cur_user = userlist.objects.get(user_open_id = openID)
    except userlist.DoesNotExist:
        rep = '好像出问题了，请填写信息'
    else:
        random_step = random.randint(0, 2000)
        new_record = sportrecords(
            sportrecords_person_id=cur_user,
            sportrecords_type=2,
            sportrecords_subtype=4,
            sportrecords_quantity=random_step,
            sportrecords_calorie=int(random_step/16),
            sportrecords_dist=int(random_step*0.8)
        )
        new_record.save()
        rep = '添加成功'
    return rep


def add_test(openID):
    try:
        cur_user = userlist.objects.get(user_open_id = openID)
    except userlist.DoesNotExist:
        rep = '好像出问题了，请填写信息'
    else:
        date = datetime.now()
        for i in range(7):
            random_step = random.randint(0, 10000)
            new_record = sportrecords(
                sportrecords_person_id=cur_user,
                sportrecords_type=2,
                sportrecords_subtype=4,
                sportrecords_quantity=random_step,
                sportrecords_calorie=int(random_step/16),
                sportrecords_dist=int(random_step*0.8/1000)
            )
            new_record.save()
            new_record.sportrecords_start_time = date + timedelta(days=-i)
            new_record.sportrecords_end_time = date + timedelta(days=-i)
            new_record.save()
        rep = '添加成功'
    return rep


def get_datatoday(openID):
    try:
        cur_user = userlist.objects.get(user_open_id=openID)
    except userlist.DoesNotExist:
        rep = '好像出问题了，请填写信息'
    else:
        cur_date = datetime.today().date()
        cur_date_begin = datetime(year=cur_date.year, month=cur_date.month, day=cur_date.day, hour=0, minute=0, second=0)
        cur_date_end = datetime(year=cur_date.year, month=cur_date.month, day=cur_date.day, hour=23, minute=59, second=59)
        rep = ''
        for subtype in range(1, 7):
            rep_head = ''
            if subtype == 1:
                rep_head = '您今天进行热身运动\n'
            elif subtype == 2:
                rep_head = '您今天进行健走运动\n'
            elif subtype == 3:
                rep_head = '您今天进行球类运动\n'
            elif subtype == 4:
                rep_head = '您今天进行跑步运动\n'
            elif subtype == 5:
                rep_head = '您今天进行游泳运动\n'
            elif subtype == 6:
                rep_head = '您今天进行骑车运动\n'
            data_gathered = gather_data(cur_user, cur_date_begin, cur_date_end, subtype)
            if data_gathered['steps'] == 0 and data_gathered['dist'] == 0 and data_gathered['cal'] == 0:
                continue
            else:
                rep_info = str('%s运动步数：%d步\n经过距离：%d千米\n消耗能量：%d大卡\n' %(rep_head, data_gathered['steps'],
                                                                      data_gathered['dist'], data_gathered['cal']))
            rep += rep_info
        if rep == '':
            rep = '没查到数据'
    return rep


def get_info(openID):
    try:
        cur_user = userlist.objects.get(user_open_id=openID)
    except userlist.DoesNotExist:
        rep = '您还没有填写个人信息'
    else:
        if cur_user.user_confirmed:
            age = cur_user.user_age
            if cur_user.user_sex == 1:
                sex = '男'
            elif cur_user.user_sex == 2:
                sex = '女'
            else:
                sex = '未定'
            weight = cur_user.user_weight
            height = cur_user.user_height
            rep = str('您的年龄:%d\n您的性别:%s\n您的身高:%dcm\n您的体重:%dkg' % (age, sex, height, weight))
        else:
            rep = '您还没有填写个人信息'
    return rep


def recommend_plan(openID):
    try:
        cur_user = userlist.objects.get(user_open_id=openID)
    except userlist.DoesNotExist:
        plan = '您还没有填写个人信息'
    else:
        if cur_user.user_confirmed:
            if cur_user.user_sex == 1:
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
                caladvise = bmr * 0.25
                rundistance = caladvise*1.6/100
                walkdistance = caladvise/52
                food = caladvise/260
                plan = "您的身体状况是：" + msg + "\n每天建议额外消耗:" + str(int(caladvise)) + "大卡\n相当于慢跑：" + \
                   str(int(rundistance)) + "公里\n或走路：" + str(int(walkdistance)) + "公里\n或少吃" + str('%.1f'%(food)) + "个汉堡\n"
            elif fatflag == 1:
                caladvise = bmr * 0.175
                rundistance = caladvise*1.6/100
                walkdistance = caladvise/52
                food = caladvise/260
                plan = "您的身体状况是：" + msg + "\n每天建议额外消耗:" + str(int(caladvise)) + "大卡\n相当于慢跑：" + \
                   str(int(rundistance)) + "公里\n或走路：" + str(int(walkdistance)) + "公里\n或少吃" + str('%.1f'%(food)) + "个汉堡\n"
            else:
                plan = "您的身体状况是：" + msg + "\n建议适量增重\n"
        else:
            plan = '您还没有填写个人信息'
    return plan


@csrf_exempt
def change_info(request):
    if request.method == 'GET':
        openID = request.GET.get('openID')
        try:
            cur_user = userlist.objects.get(user_open_id=openID)
        except userlist.DoesNotExist:
            new_user = userlist(
                user_open_id=openID
            )
            new_user.save()
            return JsonResponse({"age": new_user.user_age, "sex": new_user.user_sex, "weight": new_user.user_weight,
                                 "height": new_user.user_height, "advice": '您还没有填写个人信息', "id": "匿名", "score": 0,
                                 "avatar": "../static/img/run02.jpg"})
        else:
            score = 1000
            client = WeChatClient(API_ID, API_SECRET)
            cur_user_info = client.user.get(openID,lang=u'zh_CN')
            nickname = cur_user_info['nickname']
            avator = cur_user_info['headimgurl']
            return JsonResponse({"age": cur_user.user_age, "sex": cur_user.user_sex, "weight": cur_user.user_weight,
                                 "height": cur_user.user_height, "advice": recommend_plan(openID), "id": nickname, "score": score,
                                 "avatar": avator})
    elif request.method == 'POST':
        openID = request.POST.get('openID')
        sex = request.POST.get('sex')
        age = request.POST.get('age')
        height = request.POST.get('height')
        weight = request.POST.get('weight')
        try:
            cur_user = userlist.objects.get(user_open_id=openID)
        except userlist.DoesNotExist:
            newuser = userlist(
                user_open_id=openID,
                user_age=age,
                user_sex=sex,
                user_height=height,
                user_weight=weight,
                user_confirmed=True
            )
            newuser.save()
        else:
            cur_user.user_age = age
            cur_user.user_sex = sex
            cur_user.user_height = height
            cur_user.user_weight = weight
            cur_user.user_confirmed = True
            cur_user.save()
        return JsonResponse({"advice": recommend_plan(openID)})
    else:
        raise Http404()


def show_chart(request):
    if request.method == 'GET':
        code = request.GET.get('code')
        openID = get_openid(code)
        if openID == 0:
            raise Http404()
        else:
            return render_to_response('pedometer.html', {'openID': openID},context_instance=RequestContext(request))
    else:
        raise Http404()


def show_details(request):
    if request.method == 'GET':
        openID = request.GET.get('openID')
        return render_to_response('showchart.html', {'openID': openID},
                                  context_instance=RequestContext(request))
    else:
        raise Http404()


def goback_chart(request):
    if request.method == 'GET':
        openID = request.GET.get('openID')
        return render_to_response('pedometer.html', {'openID': openID},
                                  context_instance=RequestContext(request))
    else:
        raise Http404()


def get_week_data(request):
    if request.method == 'GET':
        openID = request.GET.get('openID')
        type = request.GET.get('type')
        nums = request.GET.get('nums')
        if type == 'init7':
            cur_date = datetime.today().date()
        else:
            datestr = request.GET.get('date')
            datelist = datestr.split('-')
            cur_date = date(int(datelist[0]), int(datelist[1]), int(datelist[2]))
        if type == 'next':
                cur_date += timedelta(days=1)
        elif type == 'previous':
                cur_date += timedelta(days=-1)
        try:
            cur_user = userlist.objects.get(user_open_id=openID)
        except userlist.DoesNotExist:
            if nums == '1':
                rep = {"date": cur_date, "steps": 0}
            else:
                rep = []
                for i in range(7):
                    rep.append({"date": (cur_date+timedelta(days=-6+i)), "steps": 0})
        else:
            if nums == '1':
                cur_date_begin = datetime(year=cur_date.year, month=cur_date.month, day=cur_date.day, hour=0, minute=0, second=0)
                cur_date_end = datetime(year=cur_date.year, month=cur_date.month, day=cur_date.day, hour=23, minute=59, second=59)
                cur_data = sportrecords.objects.filter(sportrecords_person_id=cur_user, sportrecords_type=2, sportrecords_subtype=4,
                                                       sportrecords_start_time__gte=cur_date_begin, sportrecords_start_time__lte=cur_date_end)
                if cur_data:
                    quantity = 0
                    step_goal = cur_data[0].sportrecords_step_goal
                    for single_data in cur_data:
                        quantity += single_data.sportrecords_quantity
                    rep = {"date": cur_date, "steps": quantity, "goal": step_goal}
                else:
                    step_goal = cur_user.user_step_goal
                    rep = {"date": cur_date, "steps": 0, "goal": step_goal}
            else:
                rep = []
                for i in range(7):
                    pre_date = cur_date + timedelta(days=-6+i)
                    cur_date_begin = datetime(year=pre_date.year, month=pre_date.month, day=pre_date.day, hour=0, minute=0, second=0)
                    cur_date_end = datetime(year=pre_date.year, month=pre_date.month, day=pre_date.day, hour=23, minute=59, second=59)
                    cur_data = sportrecords.objects.filter(sportrecords_person_id=cur_user, sportrecords_type=2, sportrecords_subtype=4,
                                                       sportrecords_start_time__gte=cur_date_begin, sportrecords_start_time__lte=cur_date_end)
                    if cur_data:
                        quantity = 0
                        step_goal = cur_data[0].sportrecords_step_goal
                        for single_data in cur_data:
                            quantity += single_data.sportrecords_quantity
                        rep.append({"date": pre_date, "steps": quantity, "goal": step_goal})
                    else:
                        step_goal = cur_user.user_step_goal
                        rep.append({"date": pre_date, "steps": 0,"goal": step_goal})
        return JsonResponse(rep, safe=False)
    else:
        raise Http404()


def get_openid(code):
    url = str('https://api.weixin.qq.com/sns/oauth2/access_token?appid=%s&secret=%s&code=%s'
              '&grant_type=authorization_code' % (API_ID, API_SECRET, code))
    res_data = urlopen(url)
    res = res_data.read()
    resj = json.loads(res.decode('utf-8'))
    if 'openid' in resj:
        openID = resj['openid']
        return openID
    else:
        return 0


def get_steps(request):
    if request.method == 'GET':
        openID = request.GET.get('openID')
        type = request.GET.get('type')
        if type == 'init':
            cur_date = datetime.today().date()
        else:
            datestr = request.GET.get('date')
            datelist = datestr.split('-')
            cur_date = date(int(datelist[0]), int(datelist[1]), int(datelist[2]))
            if type == 'next':
                cur_date += timedelta(days=1)
            elif type == 'previous':
                cur_date += timedelta(days=-1)
        try:
            cur_user = userlist.objects.get(user_open_id=openID)
        except userlist.DoesNotExist:
            rep = {"stepGoal": 0, "calGoal": 0, "distanceGoal": 0, "steps": 0, "distance": 0, "cal": 0}
        else:
            cur_date_begin = datetime(year=cur_date.year, month=cur_date.month, day=cur_date.day, hour=0, minute=0, second=0)
            cur_date_end = datetime(year=cur_date.year, month=cur_date.month, day=cur_date.day, hour=23, minute=59, second=59)
            cur_data = sportrecords.objects.filter(sportrecords_person_id=cur_user,
                                                   sportrecords_start_time__gte=cur_date_begin, sportrecords_end_time__lte=cur_date_end)
            if cur_data:
                quantity = 0
                calorie = 0
                dist = 0
                step_goal = cur_data[0].sportrecords_step_goal
                dist_goal = cur_data[0].sportrecords_dist_goal
                cal_goal = cur_data[0].sportrecords_calorie_goal
                for single_data in cur_data:
                    quantity += single_data.sportrecords_quantity
                    calorie += single_data.sportrecords_calorie
                    dist += single_data.sportrecords_dist
                rep = {"stepGoal": step_goal, "calGoal": cal_goal, "distanceGoal": dist_goal, "steps": quantity, "distance": dist,  "cal": calorie}
            else:
                step_goal = cur_user.user_step_goal
                dist_goal = cur_user.user_dist_goal
                cal_goal = cur_user.user_calorie_goal
                rep = {"stepGoal": step_goal, "calGoal": cal_goal, "distanceGoal": dist_goal, "steps": 0, "distance": 0, "cal": 0}
        if type != 'someday':
            rep['date'] = str(cur_date)
        return JsonResponse(rep)
    else:
        raise Http404()

def show_plan(request):
    if request.method == 'GET':
        code = request.GET.get('code')
        openID = get_openid(code)
        if openID == 0:
            raise Http404()
        else:
            return render_to_response('sportplan.html', {'openID': openID},context_instance=RequestContext(request))
    else:
        raise Http404()

@csrf_exempt
def change_plan(request):
    if request.method == 'POST':
        openID = request.POST.get('openID')
        daily_step = request.POST.get('daily_step')
        daily_dist = request.POST.get('daily_dist')
        daily_cal = request.POST.get('daily_cal')
        try:
            cur_user = userlist.objects.get(user_open_id=openID)
        except userlist.DoesNotExist:
            rep = '您还没有填写个人信息'
        else:
            cur_user.user_step_goal = daily_step
            cur_user.user_dist_goal = daily_dist
            cur_user.user_calorie_goal =daily_cal
            cur_user.save()
            cur_data = sportrecords.objects.filter(sportrecords_person_id=cur_user,
                                               sportrecords_end_time__startswith=datetime.today().date())
            for single_data in cur_data:
                single_data.sportrecords_step_goal = cur_user.user_step_goal
                single_data.sportrecords_dist_goal = cur_user.user_dist_goal
                single_data.sportrecords_calorie_goal = cur_user.user_calorie_goal
                single_data.save()
            rep = '修改成功'
        return HttpResponse(rep)
    elif request.method == 'GET':
        openID = request.GET.get('openID')
        try:
            cur_user = userlist.objects.get(user_open_id=openID)
        except userlist.DoesNotExist:
            rep = '您还没有填写个人信息'
            return HttpResponse(rep)
        else:
            step_goal = cur_user.user_step_goal
            dist_goal = cur_user.user_dist_goal
            cal_goal = cur_user.user_calorie_goal
            advice = recommend_plan(openID)
            rep = {"step_goal": step_goal, "dist_goal": dist_goal, "cal_goal": cal_goal, "advice": advice}
            return JsonResponse(rep)
    else:
        raise Http404()


def set_remind(openID):
    try:
        cur_user = userlist.objects.get(user_open_id=openID)
    except userlist.DoesNotExist:
        remind = '您还没有填写个人信息'
    else:
        cur_user.user_remind = not cur_user.user_remind
        cur_user.save()
        if cur_user.user_remind:
            remind = '提醒开启'
        else:
            remind = '提醒关闭'
    return remind


def build_match(openID):
    try:
        cur_user = userlist.objects.get(user_open_id=openID)
    except userlist.DoesNotExist:
        rep = '您还没有填写个人信息'
    else:
        new_match = matchrecords(
            matchrecords_relate_person = cur_user,
            matchrecords_originator = True,
            matchrecords_matchtype = '未定',
        )
        new_match.save()
        new_match.matchrecords_id = new_match.id
        new_match.matchrecords_title = str('比赛%d' % new_match.id)
        new_match.save()
        link = str('https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s'
                  '&redirect_uri=%s'
                  'showmatchpage?matchid=%d'
                  '&response_type=code&scope=snsapi_base&state=1#wechat_redirect' % (API_ID, serverIP, new_match.matchrecords_id))
        rep = str('<a href="%s">请点击此链接创建比赛</a>' % (link))
    return rep


def show_match_page(request):
    if request.method == 'GET':
        matchid = request.GET.get('matchid')
        code = request.GET.get('code')
        openID = get_openid(code)
        if openID == 0:
            return Http404
        try:
            userlist.objects.get(user_open_id=openID)
        except userlist.DoesNotExist:
            return HttpResponse('您还没有关注admilk应用')
        else:
            try:
                cur_match = matchrecords.objects.get(matchrecords_id=matchid, matchrecords_originator=True)
            except matchrecords.DoesNotExist:
                return HttpResponse('比赛还未创建')
            else:
                if cur_match.matchrecords_matchstate == 0:
                    if cur_match.matchrecords_relate_person.user_open_id == openID:
                        return render_to_response('createcompetition.html', {'openID': openID, 'competitionID': matchid},
                                  context_instance=RequestContext(request))
                    else:
                        return HttpResponse('你没有设置此比赛的权限')
                elif cur_match.matchrecords_matchstate == 1:
                    return render_to_response('joincompetition.html', {'openID': openID, 'competitionID': matchid},
                                  context_instance=RequestContext(request))
                elif cur_match.matchrecords_matchstate == 2:
                    return HttpResponse('比赛已经开始，请回公众号->个人中心->我的比赛查看')
                else:
                    return HttpResponse('比赛已经开始，请回公众号->个人中心->我的比赛查看')
    else:
        raise Http404()


@csrf_exempt
def create_match(request):
    if request.method == 'POST':
        openID = request.POST.get('openID')
        matchid = request.POST.get('competitionID')
        matchtype = request.POST.get('competitiontype')
        matchtitle = request.POST.get('competitionname')
        start_time = request.POST.get('datetime_start')
        end_time = request.POST.get('datetime_end')
        try:
            userlist.objects.get(user_open_id=openID)
        except userlist.DoesNotExist:
            return HttpResponse('您还没有关注admilk应用')
        else:
            try:
                cur_match = matchrecords.objects.get(matchrecords_id=matchid, matchrecords_originator=True)
            except matchrecords.DoesNotExist:
                return HttpResponse('发生了未知错误')
            else:
                if cur_match.matchrecords_matchstate == 0:
                    cur_match.matchrecords_matchtype = matchtype
                    cur_match.matchrecords_title = matchtitle
                    cur_match.matchrecords_start_time = start_time
                    cur_match.matchrecords_end_time = end_time
                    cur_match.matchrecords_matchstate = 1
                    cur_match.save()
                    if matchtype == 'comp_time':
                        cur_match.matchrecords_target = request.GET.get('goal_step')
                        cur_match.save()
                    return HttpResponse('比赛创建成功!请点击右上角「分享到朋友圈」，与好友一试高下!')
                else:
                    return HttpResponse('比赛已经创建')
    else:
        raise Http404()


@csrf_exempt
def join_match(request):
    if request.method == 'POST':
        openID = request.POST.get('openID')
        matchid = request.POST.get('competitionID')
        try:
            cur_user = userlist.objects.get(user_open_id=openID)
        except userlist.DoesNotExist:
            return HttpResponse('您还没有关注admilk应用')
        else:
            try:
                matchrecords.objects.get(matchrecords_id=matchid, matchrecords_relate_person=cur_user)
            except:
                match = matchrecords.objects.get(matchrecords_id=matchid, matchrecords_originator=True)
                new_matchrecord = matchrecords(
                    matchrecords_id=match.matchrecords_id,
                    matchrecords_title=match.matchrecords_title,
                    matchrecords_relate_person=cur_user,
                    matchrecords_originator=False,
                    matchrecords_matchtype=match.matchrecords_matchtype,
                    matchrecords_matchstate=match.matchrecords_matchstate,
                    matchrecords_steps=match.matchrecords_steps,
                    matchrecords_target=match.matchrecords_target
                )
                new_matchrecord.save()
                new_matchrecord.matchrecords_matchstate=match.matchrecords_matchstate,
                new_matchrecord.matchrecords_start_time=match.matchrecords_start_time,
                new_matchrecord.save()
                return HttpResponse('参加成功')
            else:
                return HttpResponse('您已经参加了该比赛')
    elif request.method == 'GET':
        openID = request.GET.get('openID')
        matchid = request.GET.get('competitionID')
        try:
            userlist.objects.get(user_open_id=openID)
        except userlist.DoesNotExist:
            return JsonResponse({"error": 1, "errormsg": '您还没有关注admilk应用'})
        else:
            try:
                cur_match = matchrecords.objects.get(matchrecords_id=matchid, matchrecords_originator=True)
            except matchrecords.DoesNotExist:
                return JsonResponse({"error": 1, "errormsg": '找不到该比赛'})
            else:
                cur_players = matchrecords.objects.filter(matchrecords_id=cur_match.matchrecords_id).count()
                client = WeChatClient(API_ID, API_SECRET)
                match_originator_info = client.user.get(cur_match.matchrecords_relate_person.user_open_id, lang=u'zh_CN')
                match_originator_nickname = match_originator_info['nickname']
                return JsonResponse({"error": 0, "competitiontype": cur_match.matchrecords_matchtype,
                                     "start_date": cur_match.matchrecords_start_time.date(), "end_date": cur_match.matchrecords_end_time.date(),
                                     "start_time": cur_match.matchrecords_start_time.time(), "end_time": cur_match.matchrecords_end_time.time(),
                                     "competitionname": cur_match.matchrecords_title, "currentnumber": cur_players,
                                     "originator": match_originator_nickname,
                                     "goal_step": cur_match.matchrecords_target})
    else:
        raise Http404()


def get_match_result(request):
    if request.method == 'GET':
        openID = request.GET.get('openID')
        matchid = request.GET.get('competitionID')
        ranks = []
        try:
            cur_user = userlist.objects.get(user_open_id=openID)
        except userlist.DoesNotExist:
            return JsonResponse({"competitiontype": "comp_distance",
                          "start_date": "0000-00-00", "end_date": "0000-00-00",
                          "start_time": "00:00", "end_time": "00:00",
                          "competitionname": "没有填写用户个人信息", "currentnumber": 0,
                          "originator": "","goal_step": 0,
                          "rank": ranks, "user_rank": 0})
        else:
            try:
                match = matchrecords.objects.get(matchrecords_id=matchid, matchrecords_originator=True)
            except matchrecords.DoesNotExist:
                return JsonResponse({"competitiontype": "comp_distance",
                          "start_date": "0000-00-00", "end_date": "0000-00-00",
                          "start_time": "00:00", "end_time": "00:00",
                          "competitionname": "比赛没有创建", "currentnumber": 0,
                          "originator": "","goal_step": 0,
                          "rank": ranks, "user_rank": 0})
            else:
                cur_players = matchrecords.objects.filter(matchrecords_id=match.matchrecords_id).count()
                client = WeChatClient(API_ID, API_SECRET)
                match_originator_info = client.user.get(match.matchrecords_relate_person.user_open_id, lang=u'zh_CN')
                match_originator_nickname = match_originator_info['nickname']
                if match.matchrecords_matchstate <= 1:
                    return JsonResponse({"competitiontype": match.matchrecords_matchtype,
                          "start_date": match.matchrecords_start_time.date(), "end_date": match.matchrecords_end_time.date(),
                          "start_time": match.matchrecords_start_time.time(), "end_time": match.matchrecords_end_time.time(),
                          "competitionname": match.matchrecords_title+"尚未开始", "currentnumber": cur_players,
                          "originator": match_originator_nickname,"goal_step": match.matchrecords_target,
                          "rank": ranks, "user_rank": 0})
                else:
                    if match.matchrecords_matchtype == 'comp_distance':
                        ranks = matchrecords.objects.filter(matchrecords_id=matchid).order_by("-matchrecords_steps")
                        for i in range(len(ranks)):
                            ranks[i].matchrecords_rank = i+1
                            ranks[i].save()
                    elif match.matchrecords_matchtype == 'comp_time':
                        ranks1 = matchrecords.objects.filter(matchrecords_id=matchid, matchrecords_finish_flag=True).order_by("matchrecords_finish_time")
                        ranks2 = matchrecords.objects.filter(matchrecords_id=matchid, matchrecords_finish_flag=False).order_by("-matchrecords_steps")
                        ranks = ranks1 | ranks2
                        for i in range(len(ranks)):
                            ranks[i].matchrecords_rank = i+1
                            ranks[i].save()
                    else:
                        return JsonResponse({"competitiontype": match.matchrecords_matchtype,
                          "start_date": match.matchrecords_start_time.date(), "end_date": match.matchrecords_end_time.date(),
                          "start_time": match.matchrecords_start_time.time(), "end_time": match.matchrecords_end_time.time(),
                          "competitionname": "提交的比赛类型错误", "currentnumber": cur_players,
                          "originator": match_originator_nickname,"goal_step": match.matchrecords_target,
                          "rank": ranks, "user_rank": 0})
                    user_rank = matchrecords.objects.get(matchrecords_id=matchid, matchrecords_relate_person=cur_user).matchrecords_rank
                    rank10 = ranks[0:9]
                    rank = []
                    for x in rank10:
                        client = WeChatClient(API_ID, API_SECRET)
                        match_player_info = client.user.get(x.matchrecords_relate_person.user_open_id,lang=u'zh_CN')
                        match_player_nickname = match_player_info['nickname']
                        rank.append({"name": match_player_nickname})
                    return JsonResponse({"competitiontype": match.matchrecords_matchtype,
                          "start_date": match.matchrecords_start_time.date(), "end_date": match.matchrecords_end_time.date(),
                          "start_time": match.matchrecords_start_time.time(), "end_time": match.matchrecords_end_time.time(),
                          "competitionname": match.matchrecords_title, "currentnumber": cur_players,
                          "originator": match_originator_nickname,"goal_step": match.matchrecords_target,
                          "rank": rank, "user_rank": user_rank})
    else:
        raise Http404()


def get_matches(request):
    if request.method == 'GET':
        openID = request.GET.get('openID')
        rep = []
        try:
            cur_user = userlist.objects.get(user_open_id=openID)
        except userlist.DoesNotExist:
            return JsonResponse(rep, safe=False)
        else:
            client = WeChatClient(API_ID, API_SECRET)
            cur_matches = matchrecords.objects.filter(matchrecords_relate_person=cur_user, matchrecords_matchstate__gte=1).order_by("-matchrecords_id")
            for match in cur_matches:
                match_id = match.matchrecords_id
                match_title = match.matchrecords_title
                match_state = match.matchrecords_matchstate
                match_start_time = match.matchrecords_start_time.date()
                match_end_time = match.matchrecords_end_time.date()
                match_originator = matchrecords.objects.get(matchrecords_id=match.matchrecords_id,
                                                            matchrecords_originator=True).matchrecords_relate_person
                match_originator_id = match_originator.user_open_id
                match_originator_info = client.user.get(match_originator_id,lang=u'zh_CN')
                match_originator_nickname = match_originator_info['nickname']
                cur_players = matchrecords.objects.filter(matchrecords_id=match.matchrecords_id).count()
                match_url = str('%s'
                                'showresultpage?openID=%s'
                                '&matchID=%d' % (serverIP, openID, match_id))
                rep.append({"matchplayers": cur_players, "matchstate": match_state, "matchtitle": match_title,
                            "matchoriginator": match_originator_nickname,"matchstarttime": match_start_time, "matchendtime": match_end_time,
                            "matchurl": match_url})
            return  JsonResponse(rep, safe=False)
    else:
        raise Http404()


def show_result_page(request):
    if request.method == 'GET':
        openID = request.GET.get('openID')
        matchID = request.GET.get('matchID')
        return render_to_response('resultcompetition.html', {'openID': openID, 'competitionID': matchID},
                                  context_instance=RequestContext(request))

def get_week_report(request):
    openID = request.GET.get('openID')
    try:
        cur_user = userlist.objects.get(user_open_id=openID)
    except userlist.DoesNotExist:
        step_array = []
        for i in range(7):
            step_array.append({"date": "0000-00-00", "steps": 0})
        rep = {"total": {"totalStep": 0, "totalDistance": 0, "totalCal": 0},"stepArray": step_array, "competitionArray": []}
    else:
        step_array = []
        total_step = 0
        total_dist = 0
        total_cal = 0
        cur_date = datetime.today().date()
        for i in range(7):
            pre_date = cur_date + timedelta(days=-6+i)
            cur_data = sportrecords.objects.filter(sportrecords_person_id=cur_user,
                                                   sportrecords_end_time__startswith=pre_date)
            if cur_data:
                walk_quantity = 0
                for single_data in cur_data:
                    if single_data.sportrecords_sport_type == '走路':
                        walk_quantity += single_data.sportrecords_quantity
                        total_cal += single_data.sportrecords_calorie
                step_array.append({"date": pre_date, "steps": walk_quantity})
            else:
                step_array.append({"date": pre_date, "steps": 0})
            total_step += walk_quantity
            total_dist += float(str('%.2f' % (walk_quantity*0.5/1000)))
        time_now = datetime.now()
        time_before = time_now+timedelta(days=(-7))
        joined_matches = matchrecords.objects.filter(matchrecords_relate_person=cur_user, matchrecords_matchstate=3,
                                                     matchrecords_end_time__range=(time_before,time_now))
        competitionArray = []
        for match in joined_matches:
            competitionArray.append({"name":match.matchrecords_title, "rank": match.matchrecords_rank})
        rep = {"total": {"totalStep": total_step, "totalDistance": total_dist, "totalCal": total_cal},
               "stepArray": step_array, "competitionArray": competitionArray}
    return JsonResponse(rep)


def gather_data(user, start_time, end_time, subtype):
    data_list = sportrecords.objects.filter(sportrecords_person_id=user, sportrecords_subtype=subtype,
                                            sportrecords_type=2, sportrecords_start_time__gte=start_time,
                                            sportrecords_end_time__lte=end_time)
    steps = 0
    dist = 0
    cal = 0
    for single_data in data_list:
        steps += single_data.sportrecords_quantity
        dist += single_data.sportrecords_dist
        cal += single_data.sportrecords_calorie
    return {"steps": steps, "dist": dist, "cal": cal}


