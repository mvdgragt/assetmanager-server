 CREATE TABLE monthlyequipimport (
   id INT NOT NULL AUTO_INCREMENT,
   assetnumber VARCHAR(255) NOT NULL,
   serialnumber VARCHAR(255) NOT NULL,
   assetdescription VARCHAR(255) NOT NULL,
   assettypename VARCHAR(255) NOT NULL,
   location VARCHAR(255) NOT NULL,
   purchasedate VARCHAR(255) NOT NULL,
   purchasevalue DECIMAL(10,2) NOT NULL,
   totalcost DECIMAL(10,2) NOT NULL,
   PRIMARY KEY (id)
 );