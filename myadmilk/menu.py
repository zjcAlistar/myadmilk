# encoding: utf-8
__author__ = 'Administrator'
import config
import tools

serverIP = config.serverIP
API_ID = config.API_ID
API_SECRET = config.API_SECRET

menu = {"button":
            [{"name":"我","sub_button":[
                {"type":"view","name":"积分排行","url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid="
                                                   + API_ID + "&redirect_uri=" + serverIP +
                                                   "showrank&response_type=code&scope=snsapi_base&state=1#wechat_redirect"},
                {"type":"click","name":"发布比赛","key":"build_match"},
                {"type":"click","name":"运动建议","key":"sports_advice"},
                {"type":"click","name":"查看信息","key":"view_info"},
                {"type":"view","name":"个人中心","url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid="
                                                   + API_ID + "&redirect_uri=" + serverIP +
                                                   "showinfo&response_type=code&scope=snsapi_base&state=1#wechat_redirect"}]},
             {"name":"运动计划","sub_button":[
                {"type":"click","name":"修改提醒","key":"change_remind"},
                {"type":"view","name":"一周总结","url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid="
                                                    + API_ID + "&redirect_uri=" + serverIP +
                                                    "showreport&response_type=code&scope=snsapi_base&state=1#wechat_redirect"},
                {"type":"view","name":"修改计划","url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid="
                                                    + API_ID + "&redirect_uri=" + serverIP +
                                                    "showplan&response_type=code&scope=snsapi_base&state=1#wechat_redirect"}]},
             {"name":"运动数据","sub_button":[
                 {"type":"click","name":"添加bong数据","key":"add_bong"},
                 {"type":"click","name":"添加一周测试","key":"add_test"},
                 {"type":"click","name":"添加一条测试","key":"add_test_new"},
                 {"type":"click","name":"查看今日数据","key":"show_today"},
                 {"type":"view","name":"计步器","url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid="
                                                       + API_ID + "&redirect_uri=" + serverIP +
                                                    "showchart&response_type=code&scope=snsapi_base&state=1#wechat_redirect" }]}]}

def menuInit():
    return tools.menuCreate(menu)