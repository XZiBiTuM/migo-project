from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    """
    Разрешает доступ только администраторам.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'admin')

class IsEditor(permissions.BasePermission):
    """
    Разрешает доступ администраторам и редакторам (новости).
    """
    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        return request.user.role in ['admin', 'editor']

class IsModerator(permissions.BasePermission):
    """
    Разрешает доступ администраторам и модераторам (заявки).
    """
    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        return request.user.role in ['admin', 'moderator']

class IsLegalReviewer(permissions.BasePermission):
    """
    Разрешает доступ только юристам (рецензентам).
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'reviewer')
