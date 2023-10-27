from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Rastreador

# Create your views here.
    
# class ScanWeb(views.APIView):
@api_view(['POST'])
def ScanWeb(request):
    return Response({})
    target_url = 'https://espacevirtuel.emdl.fr'
    # print("REQUEST", request)
    print("data", request.data)

    escaner = Rastreador(target_url, ["#"])
    escaner.crawl()
    escaner.run_scanner()
    
    if not escaner.vulnerabilities_found:
        return Response({ 
            'ok': True , 
            "level": 'GOOD', # GOOD | DANGER 
            'status': 400 
        } )
    else:
        return Response({ 
            'ok': False , 
            "level": 'DANGER', # GOOD | DANGER 
            'status': 400 
        } )
    