-- Create database if it doesn't exist
-- CREATE DATABASE omniboard;

-- Switch to the omniboard database
\c omniboard;

-- Create schema for the application
CREATE SCHEMA IF NOT EXISTS public;

-- Create links table if it doesn't exist
CREATE TABLE IF NOT EXISTS links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    url VARCHAR(1024) NOT NULL,
    type VARCHAR(50) NOT NULL DEFAULT 'external',
    category VARCHAR(100),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create documents table if it doesn't exist
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    source_url VARCHAR(1024) NOT NULL,
    content TEXT,
    status VARCHAR(50),
    date DATE,
    metadata_json TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'user')), -- Ensure role is either 'admin' or 'user'
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Initial data for links table
INSERT INTO links (title, url, type, category, active, created_at, updated_at)
VALUES 
    ('NASA', 'https://www.nasa.gov', 'external', NULL, true, NOW(), NOW()),
    ('NOAA', 'https://www.noaa.gov', 'external', NULL, true, NOW(), NOW()),
    ('NIH', 'https://www.nih.gov', 'external', NULL, true, NOW(), NOW()),
    ('FEMA', 'https://www.fema.gov', 'external', NULL, true, NOW(), NOW()),
    ('MITRE', 'https://www.mitre.org', 'internal', 'MITRE', true, NOW(), NOW()),
    ('MITRE GPT', 'https://gpt.mitre.org', 'internal', 'MITRE', true, NOW(), NOW()),
    ('Steam', 'https://store.steampowered.com', 'internal', 'Gaming', true, NOW(), NOW()),
    ('Valve', 'https://www.valvesoftware.com', 'internal', 'Gaming', true, NOW(), NOW()),
    ('Phys', 'https://phys.org', 'internal', 'Science', true, NOW(), NOW()),
    ('Quanta Magazine', 'https://www.quantamagazine.org', 'internal', 'Science', true, NOW(), NOW());

-- Initial data for documents table (sample bills and resolutions)
INSERT INTO documents (title, type, source_url, status, date, created_at, updated_at)
VALUES
    ('School Bus Safety Act of 2023', 's', 'https://www.congress.gov/bill/sample/school-bus-safety', 'introduced', '2023-03-15', NOW(), NOW()),
    ('HBOT Access Act of 2023', 'h.r', 'https://www.congress.gov/bill/sample/hbot-access', 'introduced', '2023-03-15', NOW(), NOW()),
    ('Working Families Tax Cut Act', 'h.r', 'https://www.congress.gov/bill/sample/working-families-tax', 'introduced', '2023-03-15', NOW(), NOW()),
    ('Nuclear Weapons Abolition and Conversion Act of 2023', 'h.r', 'https://www.congress.gov/bill/sample/nuclear-weapons', 'introduced', '2023-03-15', NOW(), NOW()),
    ('Veteran Fraud Reimbursement Act of 2023', 'h.r', 'https://www.congress.gov/bill/sample/veteran-fraud', 'introduced', '2023-03-15', NOW(), NOW()),
    
    ('An Act To clarify the rights of Indians', 'h.r', 'https://www.congress.gov/bill/sample/indian-rights', 'enrolled', '2023-12-15', NOW(), NOW()),
    ('An Act To expand national parks', 'h.r', 'https://www.congress.gov/bill/sample/national-parks', 'enrolled', '2023-12-18', NOW(), NOW()),
    ('Chesapeake and Ohio Canal Protection Act', 'h.r', 'https://www.congress.gov/bill/sample/chesapeake-ohio', 'enrolled', '2023-12-20', NOW(), NOW());

-- Initial data for users table (ensure at least one admin)
-- Use a common function to insert if exists or update/ignore to prevent errors on re-runs
-- For simplicity here, we assume it runs only once or the table is dropped/cleared before re-run.
INSERT INTO users (name, role)
VALUES
    ('Alice Admin', 'admin'),
    ('Bob User', 'user'),
    ('Charlie User', 'user'); 