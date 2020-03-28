"""dataset

Revision ID: 9a8e1c20d64b
Revises: a7b115c96b2c
Create Date: 2020-03-27 22:36:58.849551

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9a8e1c20d64b'
down_revision = 'a7b115c96b2c'
branch_labels = None
depends_on = None

from app import db, Word                        # pylint: disable=import-error

DATA = [
    Word(value="helm"),
    Word(value="kustomize"),
    Word(value="kubernetes"),
    Word(value="aws"),
    Word(value="gcp"),
    Word(value="azure"),
    Word(value="terraform"),
    Word(value="docker"),
    Word(value="shell"),
    Word(value="vault"),
    Word(value="istio"),
]

def upgrade():
    db.session.add_all(DATA)
    db.session.commit()


def downgrade():
    for data in DATA:
        rec = db.session.query(Word).filter_by(value=data.value)
        if rec:
            rec.delete()
    db.session.commit()