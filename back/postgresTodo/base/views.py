from django.http.response import HttpResponse
from django.template import loader
from django.shortcuts import render, redirect
from .models import Publicacion

def index(request):
    template = loader.get_template('base/MainPage.html')
    return HttpResponse(template.render())

def nosotrosPage(request):
    template = loader.get_template('base/Nosotros.html')
    return HttpResponse(template.render())

def primerosPasos(request):
    template = loader.get_template('base/PrimerosPasos.html')
    return HttpResponse(template.render())

def blog(request):
    return redirect(request=request, to="/learn/phishDefender")

def phishDefender(request):
    template = loader.get_template('base/Requirements.html')
    return HttpResponse(template.render())

def phishDefenderInfo(request):
    template = loader.get_template('base/hishDefenderInfo.html')
    return HttpResponse(template.render())

