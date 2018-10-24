from rest_framework.exceptions import ParseError
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView
import os
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings

class MyUploadView(APIView):
    parser_class = (MultiPartParser,)

    def post(self, request, format=None):
        file_obj = request.FILES.getlist('photos')
        print(file_obj)
        counter = 1

        if 'photos' not in request.data:
            raise ParseError("Empty content")
        
        for f in file_obj:
            path = default_storage.save('uploads/'+f.name +'.csv', ContentFile(f.read()))
            tmp_file = os.path.join(settings.MEDIA_ROOT, path)
            counter+=1

        return Response("Success")
