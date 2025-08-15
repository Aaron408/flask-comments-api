//Setup para tests
const fs = require('fs');
const path = require('path');

//Limpiar base de datos de test antes de cada suite
beforeEach(() => {
    const testDbPath = path.join(__dirname, '..', 'comments.db');
    if (fs.existsSync(testDbPath)) {
        fs.unlinkSync(testDbPath);
    }
});

//Configuración global para tests
global.console = {
    ...console,
    //Silenciar logs durante tests
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
};
