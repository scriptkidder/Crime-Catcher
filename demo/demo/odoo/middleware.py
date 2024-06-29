from .models import UserLog

class LogMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        ip_address = request.META.get('REMOTE_ADDR', None)
        user_agent = request.META.get('HTTP_USER_AGENT', None)
        
        if ip_address and user_agent:
            UserLog.objects.create(ip_address=ip_address, user_agent=user_agent)
        response = self.get_response(request)
        return response
