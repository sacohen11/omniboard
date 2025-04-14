from flask import Blueprint, jsonify, g, current_app

bp = Blueprint('auth', __name__)

@bp.route('/current-user', methods=['GET'])
def get_current_user():
    """Get the role of the currently simulated logged-in user."""
    role = current_app.config.get('CURRENT_USER_ROLE', 'user')
    return jsonify({'role': role}) 