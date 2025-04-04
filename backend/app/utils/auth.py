from functools import wraps
from flask import request, jsonify, current_app

def token_required(f):
    """
    Decorator that would normally require a valid token.
    Since Keycloak authentication has been removed, 
    this now just passes through and allows all requests.
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        # Attach mock user data to request for compatibility
        request.user = {
            'preferred_username': 'user',
            'realm_access': {
                'roles': ['admin', 'user']
            }
        }
        
        return f(*args, **kwargs)
    
    return decorated

def admin_required(f):
    """
    Decorator that would normally require admin role.
    Since Keycloak authentication has been removed,
    this now just passes through and allows all requests.
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        # All users are considered admins now
        return f(*args, **kwargs)
    
    return decorated 