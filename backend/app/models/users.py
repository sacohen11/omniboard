from app import db
from sqlalchemy.dialects.postgresql import UUID
import uuid

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(50), nullable=False) # 'admin' or 'user'
    created_at = db.Column(db.TIMESTAMP, nullable=False, server_default=db.func.now())

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'role': self.role,
            'created_at': self.created_at.isoformat() if self.created_at else None
        } 