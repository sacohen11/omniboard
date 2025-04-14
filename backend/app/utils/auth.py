from functools import wraps
from flask import request, jsonify, current_app, g, abort

def token_required(f):
    """
    Decorator that would normally require a valid token.
    Since Keycloak authentication has been removed, 
    this now just passes through and allows all requests.
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        # Attach mock user data to request for compatibility
        # This mock data might be unnecessary now, consider removing if not used
        request.user = {
            'preferred_username': 'simulated_user',
            'realm_access': {
                'roles': [current_app.config.get('CURRENT_USER_ROLE', 'user')]
            }
        }
        return f(*args, **kwargs)
    
    return decorated

def admin_required(f):
    """
    Decorator that requires the simulated user to have the 'admin' role.
    Checks the role stored in app.config during startup.
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        # Read the role from app.config
        role = current_app.config.get('CURRENT_USER_ROLE', 'user') 
        if role != 'admin':
            abort(403, description="Admin privileges required.") # Return 403 Forbidden
        return f(*args, **kwargs)
    
    return decorated 