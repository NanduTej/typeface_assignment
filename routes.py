from flask import request, jsonify
from __init__ import app, uploads, db
from models import File
from datetime import datetime
from flask_cors import CORS, cross_origin

import os


@app.route('/files', methods=['POST'])
@cross_origin(supports_credentials=True)
def create_file():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400
    if file and uploads.file_allowed(storage='', basename=file.filename):
        filename = uploads.save(file)
        file_record = File(name=filename, upload_time=datetime.now())
        db.session.add(file_record)
        db.session.commit()
        return jsonify({'message': 'File uploaded successfully'}), 201
    else:
        return jsonify({'message': 'File type not allowed'}), 400


@app.route('/files', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_files():
    # Get pagination parameters from request query string
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page', default=10, type=int)

    # Get sorting parameters from request query string
    sort_by = request.args.get('sort_by', default='upload_time')
    sort_dir = request.args.get('sort_dir', default='desc')

    # Validate sort parameters
    if sort_by not in ['upload_time', 'name']:
        return jsonify({'message': 'Invalid sort parameter'}), 400
    if sort_dir not in ['asc', 'desc']:
        return jsonify({'message': 'Invalid sort direction'}), 400

    # Query files with pagination and sorting
    if sort_dir == 'asc':
        files = File.query.order_by(getattr(File, sort_by)).paginate(page=page, per_page=per_page)
    else:
        files = File.query.order_by(getattr(File, sort_by).desc()).paginate(page=page, per_page=per_page)
    pagination = {
        'page': files.page,
        'per_page': files.per_page,
        'total_pages': files.pages,
        'total_files': files.total
    }
    return jsonify({'files': files.items, 'pagination': pagination})


@app.route('/files/<int:file_id>', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_file(file_id):
    file = File.query.get({'id': file_id})
    if file:
        return jsonify(file)
    return jsonify({'message': 'File not found'}), 404


@app.route('/files/<int:file_id>', methods=['PUT'])
@cross_origin(supports_credentials=True)
def update_file(file_id):
    file = File.query.get(file_id)
    if not file:
        return jsonify({'message': 'File not found'}), 404
    new_filename = request.get_json()['name']
    os.rename(f'uploads/{file.name}', f'uploads/{new_filename}')
    file.name = new_filename
    db.session.commit()
    return jsonify({'message': 'File updated successfully'}), 200


@app.route('/files/<int:file_id>', methods=['DELETE'])
@cross_origin(supports_credentials=True)
def delete_file(file_id):
    file = File.query.get(file_id)
    if not file:
        return jsonify({'message': 'File not found'}), 404

    # Delete the file from the folder
    file_path = os.path.join(app.config['UPLOADED_UPLOADS_DEST'], file.name)
    if os.path.exists(file_path):
        os.remove(file_path)

    db.session.delete(file)
    db.session.commit()
    return jsonify({'message': 'File deleted successfully'}), 200
