const modules = (deps) => {
  return {
    save: (module) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('INSERT INTO modules (hash, ssid, topic, user_admin_id, module_type_id) VALUES (?, ?, ?, ?, ?)', [module.hash, module.ssid, module.topic, module.user_admin_id, module.module_type_id], (error, results) => {
          if (error) {
            console.log(error)
            errorHandler(error, `Falha ao inserir módulo ${module.hash}`, reject)
            return false
          }
          resolve({ status: 200, id: results.insertId, module })
        })
      })
    },

    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('SELECT * FROM modules', (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar módulos', reject)
            return false
          }
          resolve({status: 200, modules: results})
        })
      })
    },

    one: (hash) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('SELECT * FROM modules WHERE hash = ?', hash, (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao obter o módulo', reject)
            return false
          }
          resolve({ user: results[0] })
        })
      })
    },

    del: (hash) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('DELETE FROM modules WHERE hash = ?', hash, (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao remover o módulo de id ${hash}`, reject)
            return false
          }
          resolve({ message: 'Módulo removido com sucesso!', affectedRows: results.affectedRows })
        })
      })
    },

    update: (hash, module) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('UPDATE modules SET ssid = ?, topic = ?, user_admin_id = ?, module_type_id = ? WHERE hash = ?', [module.ssid, module.topic, module.user_admin_id, module.module_type_id, hash], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao atualizar módulo ${module.hash}`, reject)
            return false
          }
          if (results.affectedRows === 0) {
            resolve({ status: 'ID não encontrado' })
          }
          resolve({ status: 200, module })
        })
      })
    }
  }
}

module.exports = modules
