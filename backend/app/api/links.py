from flask import Blueprint, jsonify, request
from app.models.links import Link
from app import db
from app.utils.auth import token_required

bp = Blueprint('links', __name__)

@bp.route('/links', methods=['GET'])
def get_links():
    """Get all active links."""
    links = Link.query.filter_by(active=True).all()
    return jsonify([link.to_dict() for link in links])

@bp.route('/links/<int:id>', methods=['GET'])
def get_link(id):
    """Get a specific link by ID."""
    link = Link.query.get_or_404(id)
    return jsonify(link.to_dict()) 