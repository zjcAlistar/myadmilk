from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
# Create your views here.
import tools


def test(request):
    tools.customSendText('olLDfv5UjSjjKWQSIASeeyJYQHLg', 'nimabi')
    tools.customSendImage('olLDfv5UjSjjKWQSIASeeyJYQHLg', 'gou.jpg')
