from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Rastreador
from .serializers import RequestSerializer
from base.models import URLRequest

@api_view(['GET'])
def getData(request):
    items = URLRequest.objects.all()
    serializer = RequestSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def ScanWeb(request):
    if request.data.get('siteUrl'):  # Cambia 'url' por 'siteUrl'
        try:
            site_url = request.data['siteUrl']  # Accede a 'siteUrl'
            request_obj, created = URLRequest.objects.get_or_create(url=site_url)
            if not created:
                # Ya existe
                serializer = RequestSerializer(request_obj)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                # scan url
                request_obj = scanFunction(request_obj)
                serializer = RequestSerializer(request_obj)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({"error": "URL no proporcionada"}, status=status.HTTP_400_BAD_REQUEST)
    

def scanFunction(target_url): # Recibe un objeto URLRequest
    escaner = Rastreador(target_url.url, ["#"])
    escaner.crawl()
    escaner.run_scanner()
    # update database
    if not escaner.vulnerabilities_found:
        target_url.vulnerable = False
    else:
        target_url.vulnerable = True

    target_url.save()
    return target_url