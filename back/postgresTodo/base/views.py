from django.shortcuts import render
from .models import Publicacion

def index(request):
    # template = loader.get_template('base/index.html')
    # return HttpResponse(template.render())
    return render(request, "mainPage.html")

def nosotrosPage(request):
    return render(request, "nosotros.html")

def primerosPasos(request):
    return render(request, "Requirements.html")

def base(request):
    return render(request, "base.html")

