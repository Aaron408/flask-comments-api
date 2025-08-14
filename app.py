from flask import Flask, request, jsonify
from datetime import datetime
import os
import sqlite3
from contextlib import contextmanager

app = Flask(__name__)

# Configuración de la base de datos
DATABASE = 'comments.db'

def init_db():
    """Inicializa la base de datos"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            author TEXT NOT NULL,
            content TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

@contextmanager
def get_db_connection():
    """Context manager para conexiones a la base de datos"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

@app.route('/health', methods=['GET'])
def health_check():
    """Endpoint de salud para verificar que la API está funcionando"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'service': 'flask-comments-api'
    }), 200

@app.route('/api/comments', methods=['GET'])
def get_comments():
    """Obtiene todos los comentarios"""
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM comments ORDER BY timestamp DESC')
            comments = cursor.fetchall()
            
            return jsonify({
                'comments': [dict(comment) for comment in comments],
                'total': len(comments)
            }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/comments', methods=['POST'])
def create_comment():
    """Crea un nuevo comentario"""
    try:
        data = request.get_json()
        
        if not data or 'author' not in data or 'content' not in data:
            return jsonify({'error': 'Author and content are required'}), 400
        
        author = data['author'].strip()
        content = data['content'].strip()
        
        if not author or not content:
            return jsonify({'error': 'Author and content cannot be empty'}), 400
        
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                'INSERT INTO comments (author, content) VALUES (?, ?)',
                (author, content)
            )
            conn.commit()
            comment_id = cursor.lastrowid
            
            # Obtener el comentario creado
            cursor.execute('SELECT * FROM comments WHERE id = ?', (comment_id,))
            new_comment = cursor.fetchone()
            
            return jsonify({
                'message': 'Comment created successfully',
                'comment': dict(new_comment)
            }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/comments/<int:comment_id>', methods=['GET'])
def get_comment(comment_id):
    """Obtiene un comentario específico"""
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM comments WHERE id = ?', (comment_id,))
            comment = cursor.fetchone()
            
            if comment is None:
                return jsonify({'error': 'Comment not found'}), 404
            
            return jsonify({'comment': dict(comment)}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/comments/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    """Elimina un comentario"""
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM comments WHERE id = ?', (comment_id,))
            comment = cursor.fetchone()
            
            if comment is None:
                return jsonify({'error': 'Comment not found'}), 404
            
            cursor.execute('DELETE FROM comments WHERE id = ?', (comment_id,))
            conn.commit()
            
            return jsonify({'message': 'Comment deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/', methods=['GET'])
def home():
    """Endpoint principal con información de la API"""
    return jsonify({
        'message': 'Flask Comments API',
        'version': '1.0.0',
        'endpoints': {
            'health': '/health',
            'get_comments': 'GET /api/comments',
            'create_comment': 'POST /api/comments',
            'get_comment': 'GET /api/comments/{id}',
            'delete_comment': 'DELETE /api/comments/{id}'
        }
    }), 200

if __name__ == '__main__':
    init_db()
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=os.environ.get('ENVIRONMENT') != 'production')
