from django.contrib import admin
from .models import UserLog
# In odoo/admin.py
from django.contrib import admin
from .models import CrimeReport

admin.site.register(CrimeReport)



admin.site.register(UserLog)
list_display = ['ip_address', 'user_agent', 'timestamp']
