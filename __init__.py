from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_uploads import UploadSet, configure_uploads, DOCUMENTS, ALL

app = Flask(__name__)

uploads = UploadSet('uploads', extensions=ALL)

app.config['UPLOADED_UPLOADS_DEST'] = 'uploads'  # Specify upload directory
configure_uploads(app, uploads)

# SQLite database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///files.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Create SQLAlchemy database instance
db = SQLAlchemy(app)

import routes
