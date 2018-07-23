const historyPneus = (deps) => {
  return {
    save: (historyPneus) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        const query = `
          INSERT INTO
          history_pneus
          (pneu_id, vehicle_id, position, km_distance, 
            recapagem, odometerInstalled, dateInstalled, 
            odometerUninstalled, dateUninstalled, note, obs)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

        connection.query(query, [historyPneus.pneu_id, historyPneus.vehicle_id,
          historyPneus.position, historyPneus.km_distance, historyPneus.recapagem,
          historyPneus.odometerInstalled, historyPneus.dateInstalled,
          historyPneus.odometerUninstalled, historyPneus.dateUninstalled,
          historyPneus.note, historyPneus.obs], (error, results) => {
          if (error) {
            console.log(error)
            errorHandler(error, `Falha ao cadastrar histórico deste pneu`, reject)
            return false
          }
          resolve({ status: 200, id: results.insertId })
        })
      })
    },

    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        const query = `
          SELECT 
          pneu_id, vehicle_id, position, km_distance, 
          recapagem, odometerInstalled, dateInstalled, 
          odometerUninstalled, dateUninstalled, note, obs 
          FROM history_pneus`

        connection.query(query, (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar histórico de pneu', reject)
            return false
          }
          resolve({status: 200, historyPneuss: results})
        })
      })
    },

    one: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        const query = `
          SELECT 
          pneu_id, vehicle_id, position, km_distance, 
          recapagem, odometerInstalled, dateInstalled, 
          odometerUninstalled, dateUninstalled, note, obs 
          FROM history_pneus WHERE id = ?`

        connection.query(query, id, (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar listar histórico de pneu', reject)
            return false
          }
          if (results.length === 0) {
            resolve(404, {status: 404, error: 'Pneu não encontrado'})
            return
          }
          resolve(results[0])
        })
      })
    },

    del: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        const query = `
          DELETE FROM history_pneus WHERE id = ?`

        connection.query(query, [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao remover o histórico de pneu ${id}`, reject)
            return false
          }
          resolve({ message: 'Histórico de pneu removido com sucesso!', affectedRows: results.affectedRows })
        })
      })
    },

    update: (id, historyPneus) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        const query = `
          UPDATE history_pneus SET 
          pneu_id = ?, vehicle_id = ?, position = ?, km_distance = ?, 
          recapagem = ?, odometerInstalled = ?, dateInstalled = ?, 
          odometerUninstalled = ?, dateUninstalled = ?, note = ?, obs = ?
          WHERE id = ?`

        connection.query(query, [historyPneus.pneu_id, historyPneus.vehicle_id,
          historyPneus.position, historyPneus.km_distance, historyPneus.recapagem,
          historyPneus.odometerInstalled, historyPneus.dateInstalled,
          historyPneus.odometerUninstalled, historyPneus.dateUninstalled,
          historyPneus.note, historyPneus.obs, id], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao atualizar histórico`, reject)
            return false
          }
          if (results.affectedRows === 0) {
            resolve(404, { status: 'ID não encontrado' })
          }
          resolve({ message: 'Histórico atualizado com sucesso!' })
        })
      })
    }

  }
}

module.exports = historyPneus
