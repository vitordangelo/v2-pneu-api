const history = (deps) => {
  return {
    armDesarmUser: (history) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        const query = 'INSERT INTO history (status, user_id, module_hash, history_type_id) VALUES (?, ?, ?, ?)'
        connection.query(query, [history.status, history.user_id, history.module_hash, history.history_type_id], (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao adicionar evento', reject)
            return false
          }
          resolve({ status: 200, eventId: results.insertId })
        })
      })
    },

    eventsByModuleHash: (hash) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        const query = 'SELECT users.first_name, users.photo_url, users.id as user_id, history.status, history.history_type_id, history.created_at FROM history JOIN users ON history.user_id = users.id WHERE module_hash = ? ORDER BY created_at DESC'
        connection.query(query, [hash], (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar eventos', reject)
            return false
          }
          resolve({ status: 200, events: results })
        })
      })
    },

    stateModule: (stateAlarm) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        const query = 'INSERT INTO history (status, user_id, module_hash, history_type_id) VALUES (?, ?, ?, ?)'
        connection.query(query, [stateAlarm.status, stateAlarm.user_id, stateAlarm.module_hash, stateAlarm.history_type_id], (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar eventos', reject)
            return false
          }
          resolve({ status: 200, events: results })
        })
      })
    }
  }
}

module.exports = history
