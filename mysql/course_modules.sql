CREATE TABLE IF NOT EXISTS nodedb.course_modules(id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, PRIMARY KEY (id), UNIQUE INDEX (name)) DEFAULT CHARSET=utf8;

INSERT IGNORE INTO nodedb.course_modules(name) VALUES 
('Docker'),
('Fundamentos de Arquitetura de Software'),
('Comunicação'),
('RabbitMQ'),
('Autenticação e Keykloak'),
('Domain Driven Design e Arquitetura hexagonal'),
('Arquitetura do projeto prático - Codeflix'),
('Microsserviço: Catálogo de vídeos com Laravel (Back-end)'),
('Microsserviço: Catálogo de vídeos com React (Front-end)');
