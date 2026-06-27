#!/usr/bin/env node
/**
 * Genera un hash bcrypt de tu contraseña.
 * Uso: node tools/hash-password.js "tu-contraseña"
 * Copia el resultado en ADMIN_PASSWORD_HASH en .env.local y en Netlify
 */

const bcrypt = require('bcryptjs')

const password = process.argv[2]

if (!password) {
  console.error('Uso: node tools/hash-password.js "tu-contraseña"')
  process.exit(1)
}

bcrypt.hash(password, 12).then(hash => {
  console.log('\n✅ Hash generado:\n')
  console.log(hash)
  console.log('\nPégalo en ADMIN_PASSWORD_HASH en .env.local y en Netlify.\n')
})
