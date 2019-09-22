from django.db import models

# Create your models here.

class text(models.Model):
    col = models.CharField(max_length =10)