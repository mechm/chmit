DROP TABLE IF EXISTS page;

CREATE TABLE page
(
    PageId smallint NOT NULL,
    AliasUrl VARCHAR(255) NOT NULL,
    Description VARCHAR(8000) NOT NULL,
    PRIMARY KEY (PageId) 
);


INSERT INTO page (PageId, AliasUrl, Description) 
VALUES
(1, 'about-me', 'About me');

CREATE INDEX idx_page_alias ON page (AliasUrl);