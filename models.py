from datetime import datetime
from __init__ import db
from dataclasses import dataclass


@dataclass
class File(db.Model):
    id: int
    name: str
    upload_time: datetime

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    upload_time = db.Column(db.DateTime, default=datetime.now)

    def __repr__(self):
        return f"File('{self.name}', '{self.upload_time}')"
