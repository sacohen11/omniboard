from flask import Blueprint, jsonify, request
from app.models.links import Link
from app import db
from app.utils.auth import admin_required

bp = Blueprint('admin', __name__)

@bp.route('/links', methods=['GET'])
@admin_required
def get_all_links():
    """Get all links (active and inactive)."""
    links = Link.query.all()
    return jsonify([link.to_dict() for link in links])

@bp.route('/links', methods=['POST'])
@admin_required
def create_link():
    """Create a new link."""
    data = request.get_json()
    
    if not data or not data.get('title') or not data.get('url'):
        return jsonify({'error': 'Missing required fields'}), 400
    
    link = Link(
        title=data.get('title'),
        url=data.get('url'),
        type=data.get('type', 'external'),
        category=data.get('category'),
        active=data.get('active', True)
    )
    
    db.session.add(link)
    db.session.commit()
    
    return jsonify(link.to_dict()), 201

@bp.route('/links/<int:id>', methods=['GET'])
@admin_required
def get_link(id):
    """Get a specific link by ID."""
    link = Link.query.get_or_404(id)
    return jsonify(link.to_dict())

@bp.route('/links/<int:id>', methods=['PUT'])
@admin_required
def update_link(id):
    """Update a specific link."""
    link = Link.query.get_or_404(id)
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    link.title = data.get('title', link.title)
    link.url = data.get('url', link.url)
    link.type = data.get('type', link.type)
    link.category = data.get('category', link.category)
    link.active = data.get('active', link.active)
    
    db.session.commit()
    
    return jsonify(link.to_dict())

@bp.route('/links/<int:id>', methods=['DELETE'])
@admin_required
def delete_link(id):
    """Delete a specific link."""
    link = Link.query.get_or_404(id)
    
    db.session.delete(link)
    db.session.commit()
    
    return jsonify({'message': 'Link deleted'}) 