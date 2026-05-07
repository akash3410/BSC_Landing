from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('manager', 'Manager'),
        ('editor', 'Editor'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    def is_admin(self):
        return self.role == 'admin'

    def is_manager(self):
        return self.role == 'manager'
    
    def is_editor(self):
        return self.role == 'editor'