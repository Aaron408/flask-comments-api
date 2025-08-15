const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Base de datos en memoria para Vercel
let db;

// Inicializar base de datos
const initDB = () => {
    db = new sqlite3.Database(':memory:');
    
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS comments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                author TEXT NOT NULL,
                content TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        // Insertar datos de ejemplo
        db.run(`
            INSERT INTO comments (author, content) VALUES 
            ('Sistema', 'API Comments desplegada exitosamente en Vercel'),
            ('Demo User', 'Este es un comentario de ejemplo')
        `);
    });
};

// Funciones helper
const runQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(query, params, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID, changes: this.changes });
            }
        });
    });
};

const queryDB = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const getOne = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

// Inicializar DB
initDB();

// Rutas
app.get('/', (req, res) => {
    res.json({
        message: 'Flask Comments API - Node.js Version',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            get_comments: 'GET /api/comments',
            create_comment: 'POST /api/comments',
            get_comment: 'GET /api/comments/{id}',
            delete_comment: 'DELETE /api/comments/{id}'
        },
        documentation: '/api/docs'
    });
});

app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'flask-comments-api-node',
        version: '1.0.0'
    });
});

app.get('/api/docs', (req, res) => {
    res.json({
        title: 'Comments API Documentation',
        version: '1.0.0',
        baseUrl: 'https://flask-comments-api.vercel.app',
        endpoints: [
            {
                method: 'GET',
                path: '/health',
                description: 'Health check endpoint'
            },
            {
                method: 'GET',
                path: '/api/comments',
                description: 'Get all comments'
            },
            {
                method: 'POST',
                path: '/api/comments',
                description: 'Create a new comment',
                body: {
                    author: 'string (required)',
                    content: 'string (required)'
                }
            },
            {
                method: 'GET',
                path: '/api/comments/:id',
                description: 'Get a specific comment by ID'
            },
            {
                method: 'DELETE',
                path: '/api/comments/:id',
                description: 'Delete a comment by ID'
            }
        ]
    });
});

app.get('/api/comments', async (req, res) => {
    try {
        const comments = await queryDB('SELECT * FROM comments ORDER BY timestamp DESC');
        res.json({
            success: true,
            data: comments,
            total: comments.length
        });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to fetch comments'
        });
    }
});

app.post('/api/comments', async (req, res) => {
    try {
        const { author, content } = req.body;
        
        if (!author || !content) {
            return res.status(400).json({
                error: 'Validation error',
                message: 'Author and content are required fields'
            });
        }
        
        if (typeof author !== 'string' || typeof content !== 'string') {
            return res.status(400).json({
                error: 'Validation error',
                message: 'Author and content must be strings'
            });
        }
        
        if (author.length < 2 || author.length > 100) {
            return res.status(400).json({
                error: 'Validation error',
                message: 'Author must be between 2 and 100 characters'
            });
        }
        
        if (content.length < 10 || content.length > 1000) {
            return res.status(400).json({
                error: 'Validation error',
                message: 'Content must be between 10 and 1000 characters'
            });
        }
        
        const result = await runQuery(
            'INSERT INTO comments (author, content) VALUES (?, ?)',
            [author.trim(), content.trim()]
        );
        
        const newComment = await getOne(
            'SELECT * FROM comments WHERE id = ?',
            [result.id]
        );
        
        res.status(201).json({
            success: true,
            message: 'Comment created successfully',
            data: newComment
        });
        
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to create comment'
        });
    }
});

app.get('/api/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                error: 'Validation error',
                message: 'Invalid comment ID'
            });
        }
        
        const comment = await getOne(
            'SELECT * FROM comments WHERE id = ?',
            [parseInt(id)]
        );
        
        if (!comment) {
            return res.status(404).json({
                error: 'Not found',
                message: `Comment with ID ${id} not found`
            });
        }
        
        res.json({
            success: true,
            data: comment
        });
        
    } catch (error) {
        console.error('Error fetching comment:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to fetch comment'
        });
    }
});

app.delete('/api/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                error: 'Validation error',
                message: 'Invalid comment ID'
            });
        }
        
        const existingComment = await getOne(
            'SELECT * FROM comments WHERE id = ?',
            [parseInt(id)]
        );
        
        if (!existingComment) {
            return res.status(404).json({
                error: 'Not found',
                message: `Comment with ID ${id} not found`
            });
        }
        
        await runQuery('DELETE FROM comments WHERE id = ?', [parseInt(id)]);
        
        res.json({
            success: true,
            message: `Comment with ID ${id} deleted successfully`,
            data: existingComment
        });
        
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to delete comment'
        });
    }
});

app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        message: `The route ${req.method} ${req.originalUrl} does not exist`,
        availableRoutes: [
            '/health',
            '/',
            '/api/comments',
            '/api/docs'
        ]
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal server error',
        message: 'Something went wrong!'
    });
});

module.exports = app;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Health check: http://localhost:${PORT}/health`);
        console.log(`API Documentation: http://localhost:${PORT}/api/docs`);
    });
}
