# encoding: utf-8
__author__ = 'Administrator'
import config
import tools

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
             {"name":"日常计划","sub_button":[
                {"type":"click","name":"修改提醒","key":"change_remind"},
                {"type":"view","name":"修改计划","url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid="
                                                    + API_ID + "&redirect_uri=" + serverIP +
                                                    "showplan&response_type=code&scope=snsapi_base&state=1#wechat_redirect"}]},
             {"name":"运动数据","sub_button":[
                 {"type":"click","name":"添加测试","key":"add_test"},
                 {"type":"click","name":"查看今日","key":"show_today"},
                 {"type":"view","name":"测试图表","url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid="
                                                       + API_ID + "&redirect_uri=" + serverIP +
                                                    "showchart&response_type=code&scope=snsapi_base&state=1#wechat_redirect" }]}]}

def menuInit():
    return tools.menuCreate(menu)