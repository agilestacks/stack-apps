from sqlalchemy import Column, Integer, String
from app import db

'''
Database initialization

INSERT INTO words (value)
VALUES
    ('helm'), ('kustomize'), ('kubernetes'), ('aws'), ('gcp'), ('azure'),
    ('terraform'), ('docker'), ('shell'), ('vault'), ('istio');
COMMIT;    
'''    

class Word(db.Model):
    __tablename__ = 'words'

    value = Column(String(32), primary_key=True)

    def __repr__(self):
        return self.value