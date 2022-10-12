from api.serializers import UserSerializer


def my_jwt_response_handler(token, user=None, request=None, extra=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }
