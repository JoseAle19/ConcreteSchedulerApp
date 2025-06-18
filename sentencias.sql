a). Crea una sentencia SQL para listar todos los clientes que pagaron su co zación.

SELECT DISTINCT c.cliente_id, c.nombre, c.correo, c.teléfono, c.direccion
FROM clientes c
JOIN cotizaciones cz ON c.cliente_id = cz.cliente_id
WHERE LOWER(cz.estatus) = 'pagada';

b). Crea una sentencia SQL para listar todos los clientes con co zaciones pendientes por pagar del mes de febrero 2025.

SELECT DISTINCT c.cliente_id, c.nombre, c.correo, c.teléfono, c.direccion
FROM clientes c
JOIN cotizaciones cz ON c.cliente_id = cz.cliente_id
WHERE LOWER(cz.estatus) = 'pendiente'
  AND cz.fecha_cotizacion BETWEEN '2025-02-01' AND '2025-02-28';

c). Obtener todas las cotizaciones que contengan al menos un producto cuyo stock sea mayor a 20.

SELECT DISTINCT cz.cotizacion_id, cz.fecha_cotizacion, cz.total_cotizado, cz.estatus
FROM cotizaciones cz
JOIN detalle_cotizacion dc ON cz.cotizacion_id = dc.cotizacion_id
JOIN productos p ON dc.producto_id = p.producto_id
WHERE p.stock > 20;

d). Listar los proveedores que suministran productos con un precio superior a 100.

SELECT DISTINCT pr.proveedor_id, pr.nombre, pr.correo, pr.telefono, pr.dirección
FROM proveedores pr
JOIN productos p ON pr.proveedor_id = p.proveedor_id
WHERE p.precio > 100;
 

e). Obtener el total de ventas por producto en cada co zación pagada.

SELECT 
  p.producto_id,
  p.nombre AS producto,
  dc.cotizacion_id,
  COUNT(dc.detalle_cotizacion_id) AS cantidad_vendida,
  SUM(dc.precio_unitario) AS total_vendido
FROM cotizaciones cz
JOIN detalle_cotizacion dc ON cz.cotizacion_id = dc.cotizacion_id
JOIN productos p ON dc.producto_id = p.producto_id
WHERE LOWER(cz.estatus) = 'pagada'
GROUP BY p.producto_id, p.nombre, dc.cotizacion_id;

f). Obtener las ventas mensuales correspondientes al año 2024.

SELECT 
  EXTRACT(MONTH FROM cz.fecha_cotizacion) AS mes,
  SUM(cz.total_cotizado) AS total_ventas
FROM cotizaciones cz
WHERE EXTRACT(YEAR FROM cz.fecha_cotizacion) = 2024
  AND LOWER(cz.estatus) = 'pagada'
GROUP BY EXTRACT(MONTH FROM cz.fecha_cotizacion)
ORDER BY mes;

 

g). Contar el número de co zaciones realizadas por cada cliente del proveedor “Concretos SA de CV” durante el 2024.

SELECT 
  c.cliente_id,
  c.nombre AS nombre_cliente,
  COUNT(cz.cotizacion_id) AS num_cotizaciones
FROM cotizaciones cz
JOIN clientes c ON cz.cliente_id = c.cliente_id
JOIN proveedores p ON cz.proveedor_id = p.proveedor_id
WHERE p.nombre = 'Concretos SA de CV'
  AND EXTRACT(YEAR FROM cz.fecha_cotizacion) = 2024
GROUP BY c.cliente_id, c.nombre
ORDER BY num_cotizaciones DESC;

h). Obtener el total de ventas realizadas a cada proveedor en los meses de enero y febrero del 2025.

SELECT 
  p.proveedor_id,
  p.nombre AS nombre_proveedor,
  SUM(cz.total_cotizado) AS total_ventas
FROM cotizaciones cz
JOIN proveedores p ON cz.proveedor_id = p.proveedor_id
WHERE LOWER(cz.estatus) = 'pagada'
  AND cz.fecha_cotizacion BETWEEN '2025-01-01' AND '2025-02-28'
GROUP BY p.proveedor_id, p.nombre
ORDER BY total_ventas DESC;
 

i). Obtener el cliente que más en co zaciones a pagado en el úl mo mes y muestra a que proveedor 
pertenece.

SELECT 
  c.cliente_id,
  c.nombre AS nombre_cliente,
  p.proveedor_id,
  p.nombre AS nombre_proveedor,
  SUM(cz.total_cotizado) AS total_pagado
FROM cotizaciones cz
JOIN clientes c ON cz.cliente_id = c.cliente_id
JOIN proveedores p ON cz.proveedor_id = p.proveedor_id
WHERE LOWER(cz.estatus) = 'pagada'
  AND EXTRACT(MONTH FROM cz.fecha_cotizacion) = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '1 month')
  AND EXTRACT(YEAR FROM cz.fecha_cotizacion) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 month')
GROUP BY c.cliente_id, c.nombre, p.proveedor_id, p.nombre
ORDER BY total_pagado DESC
LIMIT 1;
 

j). Genera un listado de proveedores que contenga el total de cotizaciones pagadas y el monto total vendido.

SELECT 
  p.proveedor_id,
  p.nombre AS nombre_proveedor,
  COUNT(cz.cotizacion_id) AS total_cotizaciones_pagadas,
  SUM(cz.total_cotizado) AS monto_total_vendido
FROM cotizaciones cz
JOIN proveedores p ON cz.proveedor_id = p.proveedor_id
WHERE LOWER(cz.estatus) = 'pagada'
GROUP BY p.proveedor_id, p.nombre
ORDER BY monto_total_vendido DESC;

k). Obtener el proveedor que ha realizado la mayor can dad de ventas en el mes de enero 2025. 

SELECT 
  p.proveedor_id,
  p.nombre AS nombre_proveedor,
  COUNT(cz.cotizacion_id) AS total_ventas
FROM cotizaciones cz
JOIN proveedores p ON cz.proveedor_id = p.proveedor_id
WHERE LOWER(cz.estatus) = 'pagada'
  AND cz.fecha_cotizacion BETWEEN '2025-01-01' AND '2025-01-31'
GROUP BY p.proveedor_id, p.nombre
ORDER BY total_ventas DESC
LIMIT 1;

 

l). Generar la información del mes con mayor número de ventas durante el 2024.

SELECT 
  EXTRACT(MONTH FROM cz.fecha_cotizacion) AS mes,
  COUNT(*) AS total_ventas
FROM cotizaciones cz
WHERE LOWER(cz.estatus) = 'pagada'
  AND EXTRACT(YEAR FROM cz.fecha_cotizacion) = 2024
GROUP BY EXTRACT(MONTH FROM cz.fecha_cotizacion)
ORDER BY total_ventas DESC
LIMIT 1;

m). Genera la información del mes con menor número de ventas.

SELECT 
  EXTRACT(MONTH FROM cz.fecha_cotizacion) AS mes,
  COUNT(*) AS total_ventas
FROM cotizaciones cz
WHERE LOWER(cz.estatus) = 'pagada'
  AND EXTRACT(YEAR FROM cz.fecha_cotizacion) = 2024
GROUP BY EXTRACT(MONTH FROM cz.fecha_cotizacion)
ORDER BY total_ventas ASC
LIMIT 1;

 

n). Genera la información del producto más co zado por mes durante el 2024.

WITH producto_mes AS (
  SELECT 
    EXTRACT(MONTH FROM cz.fecha_cotizacion) AS mes,
    p.producto_id,
    p.nombre AS nombre_producto,
    COUNT(dc.detalle_cotizacion_id) AS cantidad_cotizada
  FROM cotizaciones cz
  JOIN detalle_cotizacion dc ON cz.cotizacion_id = dc.cotizacion_id
  JOIN productos p ON dc.producto_id = p.producto_id
  WHERE EXTRACT(YEAR FROM cz.fecha_cotizacion) = 2024
  GROUP BY mes, p.producto_id, p.nombre
),
mas_cotizado_por_mes AS (
  SELECT 
    mes,
    producto_id,
    nombre_producto,
    cantidad_cotizada,
    RANK() OVER (PARTITION BY mes ORDER BY cantidad_cotizada DESC) AS rnk
  FROM producto_mes
)
SELECT 
  mes,
  producto_id,
  nombre_producto,
  cantidad_cotizada
FROM mas_cotizado_por_mes
WHERE rnk = 1
ORDER BY mes;
 

r). Genera la información del cliente con mayor compras mes a mes durante el 2024.

WITH cliente_mes AS (
  SELECT 
    EXTRACT(MONTH FROM cz.fecha_cotizacion) AS mes,
    c.cliente_id,
    c.nombre AS nombre_cliente,
    SUM(cz.total_cotizado) AS total_compras
  FROM cotizaciones cz
  JOIN clientes c ON cz.cliente_id = c.cliente_id
  WHERE LOWER(cz.estatus) = 'pagada'
    AND EXTRACT(YEAR FROM cz.fecha_cotizacion) = 2024
  GROUP BY mes, c.cliente_id, c.nombre
),
cliente_top_mes AS (
  SELECT 
    mes,
    cliente_id,
    nombre_cliente,
    total_compras,
    RANK() OVER (PARTITION BY mes ORDER BY total_compras DESC) AS rnk
  FROM cliente_mes
)
SELECT 
  mes,
  cliente_id,
  nombre_cliente,
  total_compras
FROM cliente_top_mes
WHERE rnk = 1
ORDER BY mes;


 

o). Lista a los proveedores con menor venta mes a mes durante el 2024.

WITH proveedor_mes AS (
  SELECT 
    EXTRACT(MONTH FROM cz.fecha_cotizacion) AS mes,
    p.proveedor_id,
    p.nombre AS nombre_proveedor,
    SUM(cz.total_cotizado) AS total_ventas
  FROM cotizaciones cz
  JOIN proveedores p ON cz.proveedor_id = p.proveedor_id
  WHERE LOWER(cz.estatus) = 'pagada'
    AND EXTRACT(YEAR FROM cz.fecha_cotizacion) = 2024
  GROUP BY mes, p.proveedor_id, p.nombre
),
proveedor_menor_mes AS (
  SELECT 
    mes,
    proveedor_id,
    nombre_proveedor,
    total_ventas,
    RANK() OVER (PARTITION BY mes ORDER BY total_ventas ASC) AS rnk
  FROM proveedor_mes
)
SELECT 
  mes,
  proveedor_id,
  nombre_proveedor,
  total_ventas
FROM proveedor_menor_mes
WHERE rnk = 1
ORDER BY mes;
