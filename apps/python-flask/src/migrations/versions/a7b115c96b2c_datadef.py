"""datadef

Revision ID: a7b115c96b2c
Revises: 
Create Date: 2020-03-27 22:36:24.840886

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a7b115c96b2c'
down_revision = None
branch_labels = None
depends_on = None

from app import db

def upgrade():
    db.create_all()
    db.session.commit()


def downgrade():
    db.drop_all()
    db.session.commit()