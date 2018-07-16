const sha1 = require('sha1')

const user = (deps) => {
  return {
    save: (user) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('INSERT INTO users (first_name, last_name, cpf, email, password) VALUES (?, ?, ?, ?, ?)', [user.first_name, user.last_name, user.cpf, user.email, sha1(user.password)], (error, results) => {
          if (error) {
            console.log(error)
            errorHandler(error, `Falha ao inserir usuario ${user.first_name}`, reject)
            return false
          }
          resolve({ status: 200, id: results.insertId, user })
        })
      })
    },

    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('SELECT id, first_name, last_name, cpf, email FROM users', (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar usuários', reject)
            return false
          }
          resolve({status: 200, users: results})
        })
      })
    },

    one: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        const query = `SELECT id, first_name, last_name, cpf, email FROM users WHERE id = ?`
        connection.query(query, id, (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao obter o usuário', reject)
            return false
          }
          resolve(results[0])
        })
      })
    },

    del: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao remover o usuário de id ${id}`, reject)
            return false
          }
          resolve({ message: 'Usuário removido com sucesso!', affectedRows: results.affectedRows })
        })
      })
    },

    update: (id, user) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        const query = `UPDATE users SET first_name = ?, last_name = ?, cpf = ?, email = ? WHERE id = ?`
        connection.query(query, [user.first_name, user.last_name, user.cpf, user.email, id], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao atualizar usuário`, reject)
            return false
          }
          if (results.affectedRows === 0) {
            resolve({ status: 'ID não encontrado' })
          }
          resolve({ message: 'Usuário atualizado com sucesso!' })
        })
      })
    },

    updatePassword: (id, user) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('UPDATE users SET password = ? WHERE id = ?', [sha1(user.password), id], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao atualizar senha`, reject)
            return false
          }
          if (results.affectedRows === 0) {
            resolve({ status: 'ID não encontrado' })
          }
          resolve({ status: 200 })
        })
      })
    },

    email: (email) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('SELECT id, first_name, last_name, cpf, created_at, email FROM users WHERE email =  ?', email, (error, results) => {
          if (error || results.length === 0) {
            errorHandler(error, 'Falha ao obter o usuário', reject)
            return false
          }
          resolve({ user: results[0] })
        })
      })
    }
  }
}

module.exports = user
