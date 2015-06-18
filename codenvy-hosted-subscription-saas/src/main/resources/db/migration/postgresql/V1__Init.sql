--
-- CODENVY CONFIDENTIAL
-- __________________
--
--  [2012] - [2015] Codenvy, S.A.
--  All Rights Reserved.
--
-- NOTICE:  All information contained herein is, and remains
-- the property of Codenvy S.A. and its suppliers,
-- if any.  The intellectual and technical concepts contained
-- herein are proprietary to Codenvy S.A.
-- and its suppliers and may be covered by U.S. and Foreign Patents,
-- patents in process, and are protected by trade secret or copyright law.
-- Dissemination of this information or reproduction of this material
-- is strictly forbidden unless prior written permission is obtained
-- from Codenvy S.A..
--

CREATE EXTENSION IF NOT EXISTS btree_gist;
CREATE TABLE METRICS
(
  FID                bigserial       NOT NULL,
  FAMOUNT            integer         NOT NULL,
  FDURING            int8range       NOT NULL,
  FUSER_ID           VARCHAR(128)    NOT NULL,
  FACCOUNT_ID        VARCHAR(128)    NOT NULL,
  FWORKSPACE_ID      VARCHAR(128)    NOT NULL,
  FRUN_ID            VARCHAR(128)    NOT NULL,
  CONSTRAINT PKEY_METRICS_ID PRIMARY KEY (FID),
  EXCLUDE USING  gist   (FRUN_ID WITH =,   FDURING WITH &&)
);
CREATE          INDEX IDX_METRICS_ID    ON METRICS(FID);
CREATE          INDEX IDX_METRICS_TIME  ON METRICS USING gist (FDURING);
CREATE UNIQUE   INDEX IDX_METRICS_RUN   ON METRICS(FDURING, FRUN_ID);
CREATE UNIQUE   INDEX IDX_METRICS_ROW   ON METRICS(FDURING, FUSER_ID, FACCOUNT_ID, FWORKSPACE_ID, FRUN_ID);


/* agregated memory metrics*/
CREATE TABLE MEMORY_CHARGES
(
  FID                bigserial        NOT NULL,
  FAMOUNT            NUMERIC(20,6)   NOT NULL,
  FACCOUNT_ID        VARCHAR(128)    NOT NULL,
  FWORKSPACE_ID      VARCHAR(128)    NOT NULL,
  FCALC_ID           VARCHAR(36)     NOT NULL,
  CONSTRAINT PKEY_MEMORY_CHARGES_ID PRIMARY KEY (FID)
);
CREATE          INDEX IDX_MEMORY_CHARGES_ID         ON MEMORY_CHARGES(FID);
CREATE          INDEX IDX_MEMORY_CHARGES_CALC_ID    ON MEMORY_CHARGES(FCALC_ID);
CREATE UNIQUE   INDEX IDX_MEMORY_CHARGES_ROW        ON MEMORY_CHARGES(FCALC_ID, FACCOUNT_ID, FWORKSPACE_ID);

CREATE TABLE CHARGES
(
  FID                bigserial        NOT NULL,
  FACCOUNT_ID        VARCHAR(128)    NOT NULL,
  FSERVICE_ID        VARCHAR(128)    NOT NULL,
  FFREE_AMOUNT       NUMERIC(20,6)   NOT NULL,
  FPREPAID_AMOUNT    NUMERIC(20,6)   NOT NULL,
  FPAID_AMOUNT       NUMERIC(20,6)   NOT NULL,
  FPAID_PRICE        NUMERIC(20,6)   NOT NULL,
  FCALC_ID           VARCHAR(36)     NOT NULL,
  CONSTRAINT PKEY_CHARGES_ID PRIMARY KEY (FID)
);
CREATE UNIQUE INDEX IDX_CHARGES_ID      ON CHARGES(FID);
CREATE        INDEX IDX_CHARGES_CALC_ID ON CHARGES(FCALC_ID);
CREATE        INDEX IDX_CHARGES_RECEIPT ON CHARGES(FCALC_ID, FACCOUNT_ID);
CREATE UNIQUE INDEX IDX_CHARGES_ROW     ON CHARGES(FCALC_ID, FACCOUNT_ID, FSERVICE_ID);

CREATE TABLE INVOICES
(
  FID                bigserial       NOT NULL,
  FTOTAL             NUMERIC(20,6)   NOT NULL,
  FACCOUNT_ID        VARCHAR(128)    NOT NULL,
  FCREDIT_CARD       VARCHAR(128)            ,
  FPAYMENT_TIME      timestamp               ,
  FPAYMENT_STATE     VARCHAR(128)    NOT NULL,
  FMAILING_TIME      timestamp               ,
  FCREATED_TIME      bigint          NOT NULL,
  FPERIOD            int8range       NOT NULL,
  FCALC_ID           VARCHAR(36)     NOT NULL,
  CONSTRAINT PKEY_RECEIPTS_ID PRIMARY KEY (FID),
  EXCLUDE USING  gist   (FACCOUNT_ID WITH =,   FPERIOD WITH &&)
);
CREATE UNIQUE INDEX IDX_INVOICES_ID             ON INVOICES(FID);
CREATE        INDEX IDX_INVOICES_CREATED        ON INVOICES(FCREATED_TIME DESC);
CREATE        INDEX IDX_INVOICES_ACCOUT_CREATED ON INVOICES(FACCOUNT_ID, FCREATED_TIME DESC);
CREATE UNIQUE INDEX IDX_INVOICES_ACCOUNT        ON INVOICES(FCALC_ID, FACCOUNT_ID);
CREATE UNIQUE INDEX IDX_INVOICES_RECEIPTS       ON INVOICES(FACCOUNT_ID, FPERIOD);


CREATE TABLE PREPAID
(
  FID                bigserial       NOT NULL,
  FACCOUNT_ID        VARCHAR(128)    NOT NULL,
  FAMOUNT            NUMERIC(20,6)   NOT NULL,
  FPERIOD            int8range       NOT NULL,
  FADDED            timestamp       NOT NULL,
  CONSTRAINT PKEY_PREPAID_ID PRIMARY KEY (FID),
  EXCLUDE USING  gist   (FACCOUNT_ID WITH =,   FPERIOD WITH &&)
);
CREATE UNIQUE INDEX IDX_PREPAID_ID         ON PREPAID(FID);
CREATE UNIQUE INDEX IDX_PREPAID_RECEIPTS   ON PREPAID(FACCOUNT_ID, FPERIOD);