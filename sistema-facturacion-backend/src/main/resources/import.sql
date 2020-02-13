INSERT INTO regiones (id,nombre) VALUES (1,"Sudamerica");
INSERT INTO regiones (id,nombre) VALUES (2,"Centroamerica");
INSERT INTO regiones (id,nombre) VALUES (3,"Norteamerica");
INSERT INTO regiones (id,nombre) VALUES (4,"Europa");
INSERT INTO regiones (id,nombre) VALUES (5,"Asia");
INSERT INTO regiones (id,nombre) VALUES (6,"Africa");
INSERT INTO regiones (id,nombre) VALUES (7,"Oceania");
INSERT INTO regiones (id,nombre) VALUES (8,"Antartida");

INSERT into clientes (region_id,nombre,apellido,email,telefono,dni) VALUES (1,"Alejandro","Bruzzese","alejandroburr@gmail.com","4922222","38444149");
INSERT into clientes (region_id,nombre,apellido,email,telefono,dni) VALUES (5,"Franco","Garay","fgaray@gmail.com","444444","41000000");
INSERT into clientes (region_id,nombre,apellido,email,telefono,dni) VALUES (2,"Matias","Brino","matibrino@gmail.com","111111","222222");
INSERT into clientes (region_id,nombre,apellido,email,telefono,dni) VALUES (3,"Test4","Test4","Test4@gmail.com","455543545","444444444");
INSERT into clientes (region_id,nombre,apellido,email,telefono,dni) VALUES (5,"Test5","Test5","Test5@gmail.com","455543545","444444444");
INSERT into clientes (region_id,nombre,apellido,email,telefono,dni) VALUES (5,"Test6","Test6","Test6@gmail.com","455543545","444444444");
INSERT into clientes (region_id,nombre,apellido,email,telefono,dni) VALUES (1,"Test7","Test7","Test7@gmail.com","4922222","38444149");
INSERT into clientes (region_id,nombre,apellido,email,telefono,dni) VALUES (1,"Test8","Test8","Test8@gmail.com","444444","41000000");
INSERT into clientes (region_id,nombre,apellido,email,telefono,dni) VALUES (2,"Test9","Test9","Test9@gmail.com","111111","222222");
INSERT into clientes (region_id,nombre,apellido,email,telefono,dni) VALUES (6,"Test10","Test10","Test10@gmail.com","455543545","444444444");
INSERT into clientes (region_id,nombre,apellido,email,telefono,dni) VALUES (7,"Test11","Test11","Test11@gmail.com","455543545","444444444");
INSERT into clientes (region_id,nombre,apellido,email,telefono,dni) VALUES (3,"Test12","Test12","Test12@gmail.com","455543545","444444444");
INSERT into clientes (region_id,nombre,apellido,email,telefono,dni) VALUES (2,"Test13","Test13","Test13@gmail.com","4922222","38444149");
INSERT into clientes (region_id,nombre,apellido,email,telefono,dni) VALUES (4,"Test14","Test14","Test14@gmail.com","444444","41000000");
INSERT into clientes (region_id,nombre,apellido,email,telefono,dni) VALUES (1,"Test15","Test15","Test15@gmail.com","111111","222222");
INSERT into clientes (region_id,nombre,apellido,email,telefono,dni) VALUES (5,"Test16","Test16","Test16@gmail.com","455543545","444444444");
INSERT into clientes (region_id,nombre,apellido,email,telefono,dni) VALUES (4,"Test17","Test17","Test17@gmail.com","455543545","444444444");
INSERT into clientes (region_id,nombre,apellido,email,telefono,dni) VALUES (2,"Test18","Test18","Test18@gmail.com","455543545","444444444");
INSERT into clientes (region_id,nombre,apellido,email,telefono,dni) VALUES (1,"Test19","Test19","Test19@gmail.com","4922222","38444149");
INSERT into clientes (region_id,nombre,apellido,email,telefono,dni) VALUES (6,"Test20","Test20","Test20@gmail.com","444444","41000000");
INSERT into clientes (region_id,nombre,apellido,email,telefono,dni) VALUES (5,"Test21","Test21","Test21@gmail.com","111111","222222");
INSERT into clientes (region_id,nombre,apellido,email,telefono,dni) VALUES (8,"Test22","Test22","Test22@gmail.com","455543545","444444444");
INSERT into clientes (region_id,nombre,apellido,email,telefono,dni) VALUES (3,"Test23","Test23","Test23@gmail.com","455543545","444444444");
INSERT into clientes (region_id,nombre,apellido,email,telefono,dni) VALUES (4,"Test24","Test24","Test24@gmail.com","455543545","444444444");

INSERT INTO usuarios (nombre_usuario, password, enabled) VALUES ("Ale","$2a$10$8eB1H64u8TK1bE4XFHeo5enCX4X4IF9TrC3V2vz5281o4B7QJ3uBu",1);
INSERT INTO usuarios (nombre_usuario, password, enabled) VALUES ("Fekuinh","$2a$10$WyYDa4/IAqPbOX9IDwynCujhzQwDk7AMFX3nwcDCxjOXYAlV7nEca",1);

INSERT INTO roles (nombre_rol) VALUES ("ROLE_USER");
INSERT INTO roles (nombre_rol) VALUES ("ROLE_ADMIN");

INSERT INTO usuarios_roles (usuario_id, roles_id) VALUES (1,1);
INSERT INTO usuarios_roles (usuario_id, roles_id) VALUES (2,2);
INSERT INTO usuarios_roles (usuario_id, roles_id) VALUES (2,1);

INSERT INTO productos(nombre, precio, fecha_creacion) VALUES ('Panasonic Pantalla LCD', 54000, NOW());
INSERT INTO productos(nombre, precio, fecha_creacion) VALUES ('Play Station 4 500MB', 25000, NOW());
INSERT INTO productos(nombre, precio, fecha_creacion) VALUES ('Notebook Dell Inspiron i7', 105000, NOW());
INSERT INTO productos(nombre, precio, fecha_creacion) VALUES ('Mouse HyperX  dpi10000', 3000, NOW());
INSERT INTO productos(nombre, precio, fecha_creacion) VALUES ('Teclado Logitech dxe-200', 3100, NOW());
INSERT INTO productos(nombre, precio, fecha_creacion) VALUES ('Auriculares PS4 PLATINUM', 21000, NOW());
INSERT INTO productos(nombre, precio, fecha_creacion) VALUES ('Sillon Gamer', 17000, NOW());
INSERT INTO productos(nombre, precio, fecha_creacion) VALUES ("Sony Curve 65'", 84000, NOW());
INSERT INTO productos(nombre, precio, fecha_creacion) VALUES ('Iphone X', 70000, NOW());
INSERT INTO productos(nombre, precio, fecha_creacion) VALUES ('XBOX 360', 21000, NOW());
INSERT INTO productos(nombre, precio, fecha_creacion) VALUES ('Samsung S10', 52000, NOW());
INSERT INTO productos(nombre, precio, fecha_creacion) VALUES ('Apple Watch Serie 5', 51000, NOW());
INSERT INTO productos(nombre, precio, fecha_creacion) VALUES ('Pen drive 100 GB', 1500, NOW());
INSERT INTO productos(nombre, precio, fecha_creacion) VALUES ('Notebook Lenovo i5', 54000, NOW());
INSERT INTO productos(nombre, precio, fecha_creacion) VALUES ('Iphone 8 PLUS', 65000, NOW());
INSERT INTO productos(nombre, precio, fecha_creacion) VALUES ('Heladera Whirpool NOFROST', 72000, NOW());

INSERT INTO facturas (descripcion,cliente_id,fecha_creacion) VALUES ('Factura de insumos electronicos',1,NOW());
INSERT INTO facturas_items(cantidad,factura_id,producto_id) VALUES (15,1,4);
INSERT INTO facturas_items(cantidad,factura_id,producto_id) VALUES (10,1,5);
INSERT INTO facturas_items(cantidad,factura_id,producto_id) VALUES (20,1,13);
INSERT INTO facturas_items(cantidad,factura_id,producto_id) VALUES (15,1,4);

INSERT INTO facturas (descripcion,cliente_id,fecha_creacion) VALUES ('Factura de electronica para el hogar',1,NOW());
INSERT INTO facturas_items(cantidad,factura_id,producto_id) VALUES (4,2,16);
INSERT INTO facturas_items(cantidad,factura_id,producto_id) VALUES (5,2,1);







