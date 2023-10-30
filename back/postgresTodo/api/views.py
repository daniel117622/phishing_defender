from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Rastreador
from base.models import Request
from .serializers import RequestSerializer

@api_view(['GET'])
def getData(request):
    items = Request.objects.all()
    serializer = RequestSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def ScanWeb(request):
    serializer = RequestSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        response = scanFunction(serializer['url'].value)
    return Response(response)

def scanFunction(target_url):
    # target_url = 'https://espacevirtuel.emdl.fr'
    escaner = Rastreador(target_url, ["#"])
    escaner.crawl()
    escaner.run_scanner()
    
    if not escaner.vulnerabilities_found:
        print("no danger")
        return { 
            'url_clean': True , 
            "level": 'GOOD', # GOOD | DANGER 
        }
    else:
        print("danger")
        return { 
            'url_clean': False , 
            "level": 'DANGER', # GOOD | DANGER 
        }
    