from flask import Blueprint, jsonify, request
from app.models.links import Link
from app import db
from app.utils.auth import token_required

bp = Blueprint('links', __name__)

@bp.route('/links', methods=['GET'])
def get_links():
    """Get all active links, sorted by creation date then ID."""
    links = Link.query.filter_by(active=True).order_by(Link.created_at.asc(), Link.id.asc()).all()
    return jsonify([link.to_dict() for link in links])

@bp.route('/links/<int:id>', methods=['GET'])
def get_link(id):
    """Get a specific link by ID."""
    link = Link.query.get_or_404(id)
    return jsonify(link.to_dict())

@bp.route('/links/<string:link_id>/click', methods=['POST'])
def increment_click_count(link_id):
    """Increment the click count for a specific link."""
    link = Link.query.filter_by(id=link_id).first_or_404()
    
    if link:
        link.click_count += 1
        db.session.commit()
        # Return empty success response
        return jsonify({}), 200
    else:
        # This case is handled by get_or_404, but included for clarity
        return jsonify({'error': 'Link not found'}), 404 