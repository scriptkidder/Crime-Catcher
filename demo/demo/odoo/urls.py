from django.contrib import admin
from django.urls import path
from odoo import views
from django.contrib.auth.views import LogoutView
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import views as auth_views
from django.views.generic import TemplateView

urlpatterns = [
    path("home/", views.index, name='home'),



    path('', views.LoginPage, name='login'),
    path('otp_verify/', views.OTPVerify, name='otp_verify'),
    path('admin/', admin.site.urls),
    path('signup', views.SignupPage, name='signup'),
    path('login', views.LoginPage, name='login'),
    path('home', views.HomePage, name='home'),
    path('login/signup', lambda request: redirect('/')),
    path('signup/login', lambda request: redirect('login')),

    
    path('password_reset/', auth_views.PasswordResetView.as_view(template_name='password_reset_form.html'), name='password_reset'),
    path('password_reset_done/', auth_views.PasswordResetDoneView.as_view(template_name='password_reset_done.html'), name='password_reset_done'),
    path('password_reset_confirm/<uidb64>/<token>/',auth_views.PasswordResetConfirmView.as_view(template_name='password_reset_confirm.html'), name='password_reset_confirm'),
    path('password_reset_complete/', auth_views.PasswordResetCompleteView.as_view(template_name='password_reset_complete.html'), name='password_reset_complete'),
path('submit_crime_report/', views.submit_complaint, name='submit_complaint'),
    path('track_complaint/', views.track_complaint, name='track_complaint'),
     path('report/', TemplateView.as_view(template_name='report.html'), name='report'),
      path('notification/', TemplateView.as_view(template_name='notification.html'), name='notifcation'),
      path('profile/', TemplateView.as_view(template_name='profile.html'), name='profile'),
#     path('report/', TemplateView.as_view(template_name='report_crime.html'), name='report'),
#    path('track/', TemplateView.as_view(template_name='track.html'), name='track'),
   
    
]