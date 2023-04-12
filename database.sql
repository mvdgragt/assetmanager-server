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

 CREATE TABLE monthlyupload (
 	assetdescription VARCHAR(255),
 	assetnumber VARCHAR(15),
 	assettypename VARCHAR(50),
 	location VARCHAR(255),
 	purchasedate VARCHAR(20),
 	purchasevalue VARCHAR(10),
 	serialnumber VARCHAR(25),
 	totalcost INT(10),
 	KEY `id` (`serialnumber`) USING BTREE
 );