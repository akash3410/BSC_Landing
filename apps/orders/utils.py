import re
from django.core.exceptions import ValidationError

def validate_phone(phone):
    if not re.match(r'^01[3-9]\d{8}$', phone):
        raise ValidationError("Invalid phone number")