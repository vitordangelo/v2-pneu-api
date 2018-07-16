const userHasModule = (deps) => {
  return {
    save: (userHasModule) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('INSERT INTO users_has_modules (user_id, module_id) VALUES (?, ?)', [userHasModule.user_id, userHasModule.module_id], (error, results) => {
          if (error) {
            console.log(error)
            errorHandler(error, `Falha ao inserir módulo ${userHasModule.module_id}`, reject)
            return false
          }
          resolve({ status: 200, id: results.insertId, userHasModule })
        })
      })
    },

    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('SELECT users.first_name, users.last_name, users.id as user_id, modules.hash, modules.ssid, module_type_id, modules.id as module_id FROM users_has_modules JOIN users ON users_has_modules.user_id = users.id JOIN modules ON users_has_modules.module_id = modules.id', (error, results) => {
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
        connection.query('SELECT modules.prime_date, users_has_modules.module_id, modules.user_admin_id, modules.ssid, modules.hash, modules.topic, modules.module_type_id, users_has_modules.active FROM users_has_modules JOIN modules ON users_has_modules.module_id = modules.id WHERE users_has_modules.user_id = ?', id, (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao obter o usuário', reject)
            return false
          }
          resolve({ modules: results })
        })
      })
    },

    usersByModuleId: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('SELECT users.id as user_id, users.first_name, users.photo_url, users.last_name, users.email,users.cpf FROM users_has_modules JOIN users ON users_has_modules.user_id = users.id WHERE module_id = ?', id, (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao obter o usuário', reject)
            return false
          }
          resolve({ users: results })
        })
      })
    },

    del: (userId, moduleId) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('DELETE FROM users_has_modules WHERE user_id = ? AND module_id = ?', [userId, moduleId], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, 'Falha ao remover', reject)
            return false
          }
          resolve({ message: 'Removido com sucesso!', affectedRows: results.affectedRows })
        })
      })
    },

    update: (userId, moduleId, module) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('UPDATE users_has_modules SET active = ? WHERE user_id = ? AND module_id = ?', [module.active, userId, moduleId], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao atualizar usuário módulo`, reject)
            return false
          }
          if (results.affectedRows === 0) {
            resolve({ status: 'ID não encontrado' })
          }
          resolve({ module })
        })
      })
    }
  }
}

module.exports = userHasModule
