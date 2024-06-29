from django.db import models
from django.utils import timezone
import hashlib
import uuid

class UserLog(models.Model):
    ip_address = models.CharField(max_length=50)
    user_agent = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now)

class CrimeReport(models.Model):
    STATUS_CHOICES = [
        ('Received', 'Received'),
        ('Under Review', 'Under Review'),
        ('In Progress', 'In Progress'),
        ('Resolved', 'Resolved'),
        ('Closed', 'Closed'),
    ]
    user_agent = models.CharField(max_length=255, default='')
    complaint_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    description = models.TextField()
    number = models.CharField(max_length=255)  # Assuming phone number is stored as a string
    email = models.EmailField()
    location = models.CharField(max_length=255)
    crime_type = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Received')
    created_at = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        # Hash email and number before saving
        if self.email and not self.email.startswith('hashed:'):
            hashed_email = hashlib.sha256(self.email.encode('utf-8')).hexdigest()
            self.email = f'hashed:{hashed_email}'

        if self.number and not self.number.startswith('hashed:'):
            hashed_number = hashlib.sha256(self.number.encode('utf-8')).hexdigest()
            self.number = f'hashed:{hashed_number}'

        # Hash user_agent if not already hashed
        if self.user_agent and not self.user_agent.startswith('hashed:'):
            hashed_user_agent = hashlib.sha256(self.user_agent.encode('utf-8')).hexdigest()
            self.user_agent = f'hashed:{hashed_user_agent}'

        # Generate and store complaint_id if it's not already set
        if not self.complaint_id:
            self.complaint_id = uuid.uuid4()

        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.id} - {self.user_agent}'



# from django.db import models
# from django.utils import timezone

# class UserLog(models.Model):
#     ip_address = models.CharField(max_length=50)
#     user_agent = models.TextField()
#     timestamp = models.DateTimeField(default=timezone.now)

#     def __str__(self):
#         return f'{self.ip_address} - {self.timestamp}'
