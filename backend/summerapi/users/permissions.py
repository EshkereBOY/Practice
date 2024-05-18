from rest_framework import permissions

class IsAdminOrAuthenticatedRead(permissions.BasePermission):
    def has_permission(self, request, view):
        if bool(request.method in permissions.SAFE_METHODS and request.user and request.user.is_authenticated):
            return True

        return bool(request.user and request.user.is_staff)

