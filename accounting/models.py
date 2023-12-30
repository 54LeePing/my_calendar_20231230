from django.db import models
from django.utils import timezone

class Account(models.Model):
    type = models.TextField() #消費類型
    date = models.DateField(default=timezone.now) #消費日期
    amount =  models.DecimalField(max_digits=10, decimal_places=2) #金額

    def __str__(self):
        return f"{self.type} {self.date} {self.amount}"
