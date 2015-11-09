from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
# Create your views here.
import tools

def test(request):
    return tools.customSendText('olLDfvzIL2dJYDtHjmf4Pq4y60Pk','helloworld')