#!/usr/bin/env node

// Simple script to validate Firebase service account key format
// Run with: node scripts/validate-firebase-key.js

const fs = require('fs');
const path = require('path');

// Check if JSON file path is provided
const jsonFilePath = process.argv[2];

if (!jsonFilePath) {
  console.log('Usage: node scripts/validate-firebase-key.js <path-to-service-account-json>');
  console.log('Example: node scripts/validate-firebase-key.js firebase-service-account.json');
  process.exit(1);
}

try {
  const jsonContent = fs.readFileSync(jsonFilePath, 'utf8');
  const keyData = JSON.parse(jsonContent);

  console.log('✅ JSON file is valid');
  console.log('🔍 Validating required fields...');

  const requiredFields = [
    'type',
    'project_id',
    'private_key_id',
    'private_key',
    'client_email',
    'client_id'
  ];

  let allValid = true;

  requiredFields.forEach(field => {
    if (!keyData[field]) {
      console.log(`❌ Missing required field: ${field}`);
      allValid = false;
    } else {
      console.log(`✅ ${field}: ${field === 'private_key' ? '[REDACTED]' : keyData[field]}`);
    }
  });

  if (!allValid) {
    console.log('\n❌ JSON file is missing required fields');
    process.exit(1);
  }

  // Validate private key format
  const privateKey = keyData.private_key;
  if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
    console.log('❌ Private key missing BEGIN header');
    allValid = false;
  }

  if (!privateKey.includes('-----END PRIVATE KEY-----')) {
    console.log('❌ Private key missing END header');
    allValid = false;
  }

  const keyLines = privateKey.split('\\n');
  if (keyLines.length < 3) {
    console.log('❌ Private key appears to be malformed');
    allValid = false;
  } else {
    console.log(`✅ Private key has ${keyLines.length} lines`);
  }

  if (allValid) {
    console.log('\n🎉 JSON file is valid and complete!');
    console.log('\n📋 Environment variables to set in .env:');
    console.log(`FIREBASE_ADMIN_CLIENT_EMAIL="${keyData.client_email}"`);
    console.log(`FIREBASE_ADMIN_PRIVATE_KEY="${keyData.private_key}"`);
    console.log(`NEXT_PUBLIC_FIREBASE_PROJECT_ID="${keyData.project_id}"`);

    // Extract storage bucket from client_email if possible
    const projectId = keyData.project_id;
    console.log(`NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="${projectId}.appspot.com"`);
  } else {
    console.log('\n❌ JSON file validation failed');
    process.exit(1);
  }

} catch (error) {
  console.error('❌ Error reading or parsing JSON file:', error.message);
  process.exit(1);
}
