CREATE TABLE User
(
    IdUser INT AUTO_INCREMENT,
    Name   VARCHAR(100)    NOT NULL,
    Email  VARCHAR(100)    NOT NULL,
    Status ENUM ("1", "0") NOT NULL,
    PRIMARY KEY (IdUser)
);

CREATE TABLE Orders
(
    IdOrder      INT AUTO_INCREMENT,
    IdUser       INT             NOT NULL,
    OrderNumber  INT             NOT NULL,
    DateTime     DATETIME,
    ProviderName VARCHAR(250)    NOT NULL,
    DateCreated  DATETIME        NOT NULL DEFAULT NOW(),
    Observation  VARCHAR(300),
    TotalValue   FLOAT DEFAULT 0,
    Status       ENUM ("1", "0") NOT NULL,
    PRIMARY KEY (IdOrder),
    FOREIGN KEY (IdUser) REFERENCES User (IdUser) ON DELETE CASCADE
);

CREATE TABLE OrdersProducts
(
    IdOrdersProducts INT PRIMARY KEY AUTO_INCREMENT,
    IdOrder          INT                         NOT NULL,
    ValueUnit        FLOAT                       NOT NULL,
    Unit             ENUM ("cm", "kg", "libras") NOT NULL,
    Description      VARCHAR(300)                NOT NULL,
    SKU              VARCHAR(20)                 NOT NULL,
    Quantity         INT                         NOT NULL,
    QtyBox           INT                         NOT NULL,
    Weight           FLOAT                       NOT NULL,
    Mark             VARCHAR(100)                NOT NULL,
    Status           ENUM ("1", "0")             NOT NULL,
    FOREIGN KEY (IdOrder) REFERENCES Orders (IdOrder) ON DELETE CASCADE
);

CREATE TRIGGER after_product_create
    AFTER INSERT
    ON OrdersProducts
    FOR EACH ROW
    UPDATE Orders
    SET TotalValue = (SELECT SUM(ValueUnit * (Quantity * QtyBox))
                      FROM OrdersProducts WHERE OrdersProducts.IdOrder = NEW.IdOrder)
    WHERE Orders.IdOrder = NEW.IdOrder;

CREATE TRIGGER after_product_delete
    AFTER DELETE
    ON OrdersProducts
    FOR EACH ROW
    UPDATE Orders
    SET TotalValue = (SELECT SUM(ValueUnit * (Quantity * QtyBox))
                      FROM OrdersProducts WHERE OrdersProducts.IdOrder = OLD.IdOrder)
    WHERE Orders.IdOrder = OLD.IdOrder;

CREATE TRIGGER after_product_update
    AFTER UPDATE
    ON OrdersProducts
    FOR EACH ROW
    UPDATE Orders
    SET TotalValue = (SELECT SUM(ValueUnit * (Quantity * QtyBox))
                      FROM OrdersProducts WHERE OrdersProducts.IdOrder = NEW.IdOrder)
    WHERE Orders.IdOrder = NEW.IdOrder;
