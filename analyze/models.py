from django.db import models
from django.conf import settings

    
# Create your models here.
class text(models.Model):
    
    col = models.CharField(max_length =10)
    number = models.IntegerField(null=True)
    url = models.URLField(default='www.ntub.edu.tw')

# class AnalyzePost(models.Model):
#     user = models.ForeignKey(settings.AUTH_USER.MODEL, on_delete=models.CASCADE)
#     title = models.CharField(max_length=120, null=True, blank=True)
#     content = models.CharField(max_length=120, null=True, blank=True)
#     timestamp = models.CharField(max_length=120, null=True, blank=True)

#     def __str__(self):
#         return self.user