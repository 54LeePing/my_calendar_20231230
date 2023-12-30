from django.db import models

class Calendar(models.Model):
    date = models.DateField() #事件日期
    time = models.TimeField() #事件時間
    description = models.CharField(max_length = 255) #事件
    is_important = models.BooleanField(default = False) #標註事件是否為"重要事件"，預設是否

    def __str__(self):
        return f"{self.date} {self.time} {self.description} {self.is_important}"
