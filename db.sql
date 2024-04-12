-- Active: 1710275130508@@127.0.0.1@3306@app_hotel
CREATE DATABASE app_hotel;

USE app_hotel;

DELETE FROM users;

/* insert bedroms */

INSERT INTO
    bedroom_type (
        id, type, price_for_one_night, num_single_beds, num_king_size_beds, num_restroom, num_tv, url_image
    )
VALUES (
        UUID(), 'sencilla', 50, 1, 0, 1, 1, ''
    ),
    (
        UUID(), 'doble', 60, 2, 0, 1, 1, ''
    ),
    (
        UUID(), 'king size', 70, 0, 1, 1, 1, ''
    ),
    (
        UUID(), 'triple', 80, 3, 0, 1, 1, ''
    );

/* 
d98ef7e3-d8f8-11ee-8ba7-c43d1ad6512c - sencilla
d992d871-d8f8-11ee-8ba7-c43d1ad6512c - doble
d992dea7-d8f8-11ee-8ba7-c43d1ad6512c - king size
d992e076-d8f8-11ee-8ba7-c43d1ad6512c - triple
*/

INSERT INTO
    bedrooms (
        id, num_bedroom, status, bedroomTypeId
    )
VALUES (
        UUID(), 1, 'available', 'd98ef7e3-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 2, 'available', 'd98ef7e3-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 3, 'available', 'd98ef7e3-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 4, 'available', 'd98ef7e3-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 5, 'available', 'd98ef7e3-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 6, 'available', 'd98ef7e3-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 7, 'available', 'd98ef7e3-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 8, 'available', 'd98ef7e3-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 9, 'available', 'd98ef7e3-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 10, 'available', 'd98ef7e3-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 11, 'available', 'd992d871-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 12, 'available', 'd992d871-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 13, 'available', 'd992d871-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 14, 'available', 'd992d871-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 15, 'available', 'd992d871-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 16, 'available', 'd992d871-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 17, 'available', 'd992d871-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 18, 'available', 'd992d871-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 19, 'available', 'd992d871-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 20, 'available', 'd992d871-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 21, 'available', 'd992dea7-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 22, 'available', 'd992dea7-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 23, 'available', 'd992dea7-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 24, 'available', 'd992dea7-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 25, 'available', 'd992dea7-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 26, 'available', 'd992dea7-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 27, 'available', 'd992dea7-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 28, 'available', 'd992dea7-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 29, 'available', 'd992dea7-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 30, 'available', 'd992dea7-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 31, 'available', 'd992e076-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 32, 'available', 'd992e076-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 33, 'available', 'd992e076-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 34, 'available', 'd992e076-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 35, 'available', 'd992e076-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 36, 'available', 'd992e076-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 37, 'available', 'd992e076-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 38, 'available', 'd992e076-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 39, 'available', 'd992e076-d8f8-11ee-8ba7-c43d1ad6512c'
    ),
    (
        UUID(), 40, 'available', 'd992e076-d8f8-11ee-8ba7-c43d1ad6512c'
    );

DESC reservations;

SELECT 1
FROM Reservaciones
WHERE
    habitacion_id = @habitacion_id
    AND estado = 'activo'
    AND (
        (
            @fecha_entrada BETWEEN fecha_inicio AND fecha_fin
        )
        OR (
            @fecha_salida BETWEEN fecha_inicio AND fecha_fin
        )
        OR (
            fecha_inicio BETWEEN @fecha_entrada AND @fecha_salida
        )
    )

use app_hotel;

SELECT *
FROM Reservaciones
WHERE
    cliente_id = p_cliente_id
    AND estado = 'activo'
    AND (
        (
            p_fecha_inicio BETWEEN fecha_inicio AND fecha_fin
        )
        OR (
            p_fecha_fin BETWEEN fecha_inicio AND fecha_fin
        )
        OR (
            fecha_inicio BETWEEN p_fecha_inicio AND p_fecha_fin
        )
    );

SELECT *
FROM reservations
    INNER JOIN bedrooms ON reservations.bedroomId = bedrooms.id
WHERE (
        '2024-03-02' BETWEEN check_in_date AND check_out_date
        OR '2024-03-18' BETWEEN check_in_date AND check_out_date
    )
    AND bedrooms.status = 'busy'
    AND userId = 'ae7ecfa3-a426-4c35-becf-ad344eda7e98';

/*  */
UPDATE bedrooms SET status = 'available' WHERE status = 'busy';

SELECT * FROM bedrooms WHERE status = 'busy';
-- Active: 1709428322413@@127.0.0.1@3306@app_hotel
USE app_hotel;

SELECT *
FROM `password-reset-token`
ORDER BY created_at DESC
LIMIT 1;