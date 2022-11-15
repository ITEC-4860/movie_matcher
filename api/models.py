from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


# Create your models here.
class Profile(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, related_name="profile", on_delete=models.CASCADE)
    friends = models.ManyToManyField(User, related_name="friends", blank=True)
    birthday = models.DateField(null=True, blank=True)
    phone = models.CharField(max_length=32, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    zip = models.IntegerField(null=True, blank=True)
    state = models.CharField(max_length=2, null=True, blank=True)

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()


class FriendRequest(models.Model):
    id = models.AutoField(primary_key=True)
    from_user = models.ForeignKey(Profile, related_name="from_user", on_delete=models.CASCADE)
    to_user = models.ForeignKey(Profile, related_name="to_user", on_delete=models.CASCADE)


@receiver(post_save, sender=Profile)
def create_friend_request(sender, recipient, created, **kwargs):
    if created:
        FriendRequest.objects.create(from_user=sender, to_user=recipient)


@receiver(post_save, sender=Profile)
def handle_friend_request(sender, recipient, accepted, **kwargs):
    if accepted:
        sender.friends.update(friends=recipient)
    else:
        FriendRequest.objects.delete(from_user=recipient, to_user=sender)
