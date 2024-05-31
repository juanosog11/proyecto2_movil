use app;
  
 CREATE TABLE Pais(
     id INT AUTO_INCREMENT PRIMARY KEY,
     nombre VARCHAR(255) NOT NULL,
     UNIQUE(nombre)
 );

  
 CREATE TABLE Moneda(
     id INT AUTO_INCREMENT PRIMARY KEY,
     nombre VARCHAR(255) NOT NULL,
     simbolo VARCHAR(10) NOT NULL,
     UNIQUE(nombre)
 );

  
 CREATE TABLE Pais_Moneda(
     id INT AUTO_INCREMENT PRIMARY KEY,
     pais_id INT,
     moneda_id INT,
     FOREIGN KEY(pais_id) REFERENCES Pais(id),
     FOREIGN KEY(moneda_id) REFERENCES Moneda(id)
 );

  
 CREATE TABLE Usuario(
     id INT AUTO_INCREMENT PRIMARY KEY,
     nombre VARCHAR(255) NOT NULL,
     pais_id INT,
     saldo DECIMAL(15, 2) NOT NULL,
     correo VARCHAR(255) NOT NULL UNIQUE,
     contraseña VARCHAR(255) NOT NULL,
     FOREIGN KEY(pais_id) REFERENCES Pais(id)
 );

  
 CREATE TABLE Usuario_Accion(
     id INT AUTO_INCREMENT PRIMARY KEY,
     usuario_id INT,
     simbolo_empresa VARCHAR(20),
     cantidad INT NOT NULL,
     precio_compra DECIMAL(10, 2) NOT NULL,
     fecha_compra DATE NOT NULL,
     FOREIGN KEY(usuario_id) REFERENCES Usuario(id)
 );

  