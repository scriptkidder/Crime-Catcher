from django.http import JsonResponse
from django.shortcuts import render, redirect, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.db.utils import IntegrityError
from django.contrib.auth.decorators import login_required
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.forms import SetPasswordForm
from django.core.mail import send_mail
from django.conf import settings
import random
import string
from typing import Optional
from django.shortcuts import render
from django.http import JsonResponse
from .models import CrimeReport
from django.shortcuts import render, get_object_or_404
from .models import CrimeReport

def track_complaint(request):
    if request.method == 'POST':
        complaint_id = request.POST.get('complaintId')
        complaint = get_object_or_404(CrimeReport, complaint_id=complaint_id)
        return render(request, 'track_complaint.html', {'complaint': complaint})

    return render(request, 'track_complaint.html')

def submit_complaint(request):
    if request.method == 'POST':
        description = request.POST.get('description')
        number = request.POST.get('phone')
        email = request.POST.get('email')
        location = request.POST.get('location')
        crime_type = request.POST.get('crime_type')

        # Save complaint to the database
        complaint = CrimeReport(
            description=description,
            number=number,
            email=email,
            location=location,
            crime_type=crime_type
        )
        complaint.save()

        # Send email to the user with the complaint ID
        send_mail(
            'Your Complaint ID',
            f'Your complaint has been received. Your complaint ID is {complaint.complaint_id}.',
            'noreply@example.com',
            [email],
            fail_silently=False,
        )

        return redirect('track_complaint')  # Redirect to the track complaint page

    return render(request, 'report_crime.html')

@login_required
def index(request):
    return render(request, 'index.html')


@csrf_exempt
def HomePage(request):
    if request.user.is_authenticated:
        return render(request, 'index.html')
    else:
        return redirect('/')


def generate_otp(length: int = 6, characters: str = string.digits) -> str:
    """Generate a random OTP (One-Time Password) of the given length and characters."""
    return ''.join(random.choices(characters, k=length))

from django.template.loader import render_to_string


def send_otp_email(email: str, otp: str) -> Optional[int]:
    """
    Send an email containing the given OTP to the specified email address.

    Returns:
        The number of successfully delivered messages (1 if successful, 0 if not).
    """
    subject = 'Your OTP for Signup And Fuckoff'
    context = {
        'otp': otp,
        'site_name': 'Your Site Name',
    }
    message = render_to_string('otp_email.html', context)
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [email]

    return (send_mail(subject, message, from_email, recipient_list, fail_silently=False, html_message=message)


@csrf_exempt)
def SignupPage(request):
    error_message = None
    if request.method == 'POST':
        uname = request.POST.get('username')
        email = request.POST.get('email')
        pass1 = request.POST.get('password')

        # Check if username or email is already in use
        if User.objects.filter(username=uname).exists():
            error_message = 'Username is already in use. Please choose a different username.'
        elif User.objects.filter(email=email).exists():
            error_message = 'Email is already in use. Please use a different email.'
        else:
            # Generate OTP
            otp = ''.join(random.choices(string.digits, k=6))

            # Send OTP to the user's email
            send_mail(
                'Your OTP for Signup',
                f'Your OTP is: {otp}',
                settings.EMAIL_HOST_USER,
                [email],
                fail_silently=False,
            )

            # Save the OTP in the session for verification
            request.session['otp'] = otp
            request.session['username'] = uname
            request.session['email'] = email
            request.session['password'] = pass1

            return redirect('otp_verify')  # Redirect to OTP verification page

    return render(request, 'signup.html', {'error_message': error_message})


def OTPVerify(request):
    error_message = None
    if request.method == 'POST':
        otp_entered = request.POST.get('otp')
        otp_generated = request.session.get('otp')

        if otp_entered == otp_generated:
            # OTP matched, create the user
            uname = request.session.get('username')
            email = request.session.get('email')
            pass1 = request.session.get('password')

            # Check if email is already in use
            if User.objects.filter(email=email).exists():
                error_message = 'Email is already in use. Please use a different email.'
            else:
                try:
                    my_user = User.objects.create_user(uname, email, pass1)
                    my_user.save()
                    return redirect('login')
                except IntegrityError:
                    error_message = 'Username already exists. Please choose a different username.'
        else:
            error_message = 'Incorrect OTP. Please try again.'

    return render(request, 'otp_verify.html', {'error_message': error_message})


def LoginPage(request):
    error_message = None
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        # Check if the user exists
        if User.objects.filter(email=email).exists():
            user = authenticate(request, username=User.objects.get(email=email).username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')
            else:
                error_message = 'Incorrect password. Please try again.'
        else:
            error_message = 'Email not registered. Please signup.'

    return render(request, 'login.html', {'error_message': error_message})


def password_reset_confirm(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        if request.method == 'POST':
            form = SetPasswordForm(user, request.POST)
            if form.is_valid():
                form.save()
                # Log the user in
                user = authenticate(request, username=user.username, password=form.cleaned_data['new_password1'])
                if user is not None:
                    login(request, user)
                return redirect('password_reset_complete.html')  # Redirect to password_reset_complete.html
        else:
            form = SetPasswordForm(user)
        return render(request, 'password_reset_confirm.html', {'form': form})
    else:
        return render(request, 'password_reset_invalid.html')