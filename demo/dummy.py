import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'demo.demo.settings')
django.setup()

from demo.odoo.models import CrimeReport 

# Dummy data for complaints
dummy_complaints = [
    {
        'description': 'Theft at downtown market',
        'number': 'CR001',
        'email': 'john.doe@example.com',
        'location': 'Downtown, City A',
        'crime_type': 'Theft'
    },
    {
        'description': 'Vandalism in city park',
        'number': 'CR002',
        'email': 'jane.smith@example.com',
        'location': 'City Park, City B',
        'crime_type': 'Vandalism'
    },
    # Add more dummy complaints as needed
]

# Function to create dummy complaints
def create_dummy_complaints():
    for complaint in dummy_complaints:
        CrimeReport.objects.create(
            description=complaint['description'],
            number=complaint['number'],
            email=complaint['email'],
            location=complaint['location'],
            crime_type=complaint['crime_type']
        )

# Run the function to create dummy complaints
if __name__ == '__main__':
    create_dummy_complaints()
    print("Dummy complaints created successfully.")
