"""myadmilk URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^weixin', 'adWrist.views.handle_msg', name='handle_msg'),
    url(r'^showinfo', 'adWrist.views.show_info_page', name='show_info_page'),
    url(r'^changeinfo/$', 'adWrist.views.change_info', name='change_info'),
    url(r'^showchart', 'adWrist.views.show_chart', name='show_chart'),
    url(r'^showdetails', 'adWrist.views.show_details', name='show_details'),
    url(r'gobackchart', 'adWrist.views.goback_chart', name='goback_chart'),
    url(r'^getweekdata', 'adWrist.views.get_week_data', name='get_week_data'),
    url(r'^getsteps', 'adWrist.views.get_steps', name='get_steps'),
    url(r'^showplan', 'adWrist.views.show_plan', name='show_plan'),
    url(r'^changeplan', 'adWrist.views.change_plan', name='change_plan'),
    url(r'^signin', 'adWrist.views.sign_in', name='sign_in'),
]
