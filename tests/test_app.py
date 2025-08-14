import unittest
import json
import tempfile
import os
from app import app, init_db, DATABASE

class FlaskCommentsAPITestCase(unittest.TestCase):
    
    def setUp(self):
        """Configuración antes de cada test"""
        self.app = app.test_client()
        self.app.testing = True
        
        # Crear una base de datos temporal para tests
        self.test_db = tempfile.NamedTemporaryFile(delete=False)
        app.config['DATABASE'] = self.test_db.name
        
        # Actualizar la variable global DATABASE
        global DATABASE
        DATABASE = self.test_db.name
        
        # Inicializar la base de datos
        init_db()
    
    def tearDown(self):
        """Limpieza después de cada test"""
        os.unlink(self.test_db.name)
    
    def test_health_check(self):
        """Test del endpoint de salud"""
        response = self.app.get('/health')
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        self.assertEqual(data['status'], 'healthy')
        self.assertIn('timestamp', data)
        self.assertEqual(data['service'], 'flask-comments-api')
    
    def test_home_endpoint(self):
        """Test del endpoint principal"""
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        self.assertEqual(data['message'], 'Flask Comments API')
        self.assertIn('endpoints', data)
    
    def test_get_comments_empty(self):
        """Test obtener comentarios cuando no hay ninguno"""
        response = self.app.get('/api/comments')
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        self.assertEqual(len(data['comments']), 0)
        self.assertEqual(data['total'], 0)
    
    def test_create_comment(self):
        """Test crear un comentario"""
        comment_data = {
            'author': 'Test User',
            'content': 'This is a test comment'
        }
        
        response = self.app.post('/api/comments',
                                data=json.dumps(comment_data),
                                content_type='application/json')
        self.assertEqual(response.status_code, 201)
        
        data = json.loads(response.data)
        self.assertEqual(data['message'], 'Comment created successfully')
        self.assertIn('comment', data)
        self.assertEqual(data['comment']['author'], 'Test User')
        self.assertEqual(data['comment']['content'], 'This is a test comment')
    
    def test_create_comment_invalid_data(self):
        """Test crear comentario con datos inválidos"""
        # Sin author
        response = self.app.post('/api/comments',
                                data=json.dumps({'content': 'Test'}),
                                content_type='application/json')
        self.assertEqual(response.status_code, 400)
        
        # Sin content
        response = self.app.post('/api/comments',
                                data=json.dumps({'author': 'Test'}),
                                content_type='application/json')
        self.assertEqual(response.status_code, 400)
        
        # Campos vacíos
        response = self.app.post('/api/comments',
                                data=json.dumps({'author': '', 'content': ''}),
                                content_type='application/json')
        self.assertEqual(response.status_code, 400)
    
    def test_get_comment_by_id(self):
        """Test obtener comentario por ID"""
        # Primero crear un comentario
        comment_data = {
            'author': 'Test User',
            'content': 'This is a test comment'
        }
        
        create_response = self.app.post('/api/comments',
                                       data=json.dumps(comment_data),
                                       content_type='application/json')
        created_comment = json.loads(create_response.data)['comment']
        
        # Obtener el comentario por ID
        response = self.app.get(f'/api/comments/{created_comment["id"]}')
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        self.assertEqual(data['comment']['id'], created_comment['id'])
        self.assertEqual(data['comment']['author'], 'Test User')
    
    def test_get_comment_not_found(self):
        """Test obtener comentario que no existe"""
        response = self.app.get('/api/comments/999')
        self.assertEqual(response.status_code, 404)
    
    def test_delete_comment(self):
        """Test eliminar comentario"""
        # Primero crear un comentario
        comment_data = {
            'author': 'Test User',
            'content': 'This is a test comment'
        }
        
        create_response = self.app.post('/api/comments',
                                       data=json.dumps(comment_data),
                                       content_type='application/json')
        created_comment = json.loads(create_response.data)['comment']
        
        # Eliminar el comentario
        response = self.app.delete(f'/api/comments/{created_comment["id"]}')
        self.assertEqual(response.status_code, 200)
        
        # Verificar que fue eliminado
        get_response = self.app.get(f'/api/comments/{created_comment["id"]}')
        self.assertEqual(get_response.status_code, 404)
    
    def test_delete_comment_not_found(self):
        """Test eliminar comentario que no existe"""
        response = self.app.delete('/api/comments/999')
        self.assertEqual(response.status_code, 404)

if __name__ == '__main__':
    unittest.main()
