const pneuInstaled = (deps) => {
  return {
    save: (pneuInstaled) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        const query = `
          INSERT INTO
          pneus_instaled
          (vehicle_id, pneu_id, date, eixo, obs, odometer_instaled, position, side)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

        connection.query(query, [pneuInstaled.vehicle_id, pneuInstaled.pneu_id, pneuInstaled.date,
          pneuInstaled.eixo, pneuInstaled.obs, pneuInstaled.odometer_instaled, pneuInstaled.position,
          pneuInstaled.side], (error, results) => {
          if (error) {
            console.log(error)
            errorHandler(error, `Falha ao cadastrar pneu`, reject)
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
          pneus_instaled.vehicle_id, pneus_instaled.pneu_id, pneus_instaled.date, pneus_instaled.eixo, 
          pneus_instaled.obs, pneus_instaled.odometer_instaled, pneus_instaled.position, pneus_instaled.side,
          pneus_instaled.id as pneu_instaled_id, vehicles.number_car, vehicles.brand, vehicles.type, vehicles.year, 
          vehicles.plate, vehicles.id as vehicles_id, pneus.id as pneus_id, pneus.dimension, pneus.brand, 
          pneus.pr, pneus.type, pneus.number, pneus.registry, pneus.new, pneus.recachutado, pneus.is_installed
          FROM pneus_instaled
          JOIN pneus ON pneus_instaled.pneu_id = pneus.id 
          JOIN vehicles ON pneus_instaled.vehicle_id = vehicles.id`

        connection.query(query, (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar Pneus instalados', reject)
            return false
          }
          resolve({status: 200, pneuInstaleds: results})
        })
      })
    },

    one: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        const query = `
        SELECT 
        pneus_instaled.vehicle_id, pneus_instaled.pneu_id, pneus_instaled.date, pneus_instaled.eixo, 
        pneus_instaled.obs, pneus_instaled.odometer_instaled, pneus_instaled.position, pneus_instaled.side,
        pneus_instaled.id as pneu_instaled_id, vehicles.number_car, vehicles.brand, vehicles.type, vehicles.year, 
        vehicles.plate, vehicles.id as vehicles_id, pneus.id as pneus_id, pneus.dimension, pneus.brand, 
        pneus.pr, pneus.type, pneus.number, pneus.registry, pneus.new, pneus.recachutado, pneus.is_installed
        FROM pneus_instaled
        JOIN pneus ON pneus_instaled.pneu_id = pneus.id 
        JOIN vehicles ON pneus_instaled.vehicle_id = vehicles.id 
        WHERE pneus_instaled.id = ?`

        connection.query(query, id, (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar pneu instalado', reject)
            return false
          }
          if (results.length === 0) {
            resolve({ status: 404, error: 'Pneu não encontrado' })
            return false
          }
          resolve(results[0])
        })
      })
    },

    del: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        const query = `
          DELETE FROM pneus_instaled WHERE id = ?`

        connection.query(query, [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao remover o pneu instadado de id ${id}`, reject)
            return false
          }
          resolve({ message: 'Pneu removido com sucesso!', affectedRows: results.affectedRows })
        })
      })
    },

    update: (id, pneuInstaled) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        const query = `
          UPDATE pneus_instaled SET 
          vehicle_id = ?, pneu_id = ?, date = ?, eixo = ?, obs = ?, odometer_instaled = ?, 
          position = ?, side = ?
          WHERE id = ?`

        connection.query(query, [pneuInstaled.vehicle_id, pneuInstaled.pneu_id, pneuInstaled.date,
          pneuInstaled.eixo, pneuInstaled.obs, pneuInstaled.odometer_instaled, pneuInstaled.position,
          pneuInstaled.side, id], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao atualizar pneu instalado`, reject)
            return false
          }
          if (results.affectedRows === 0) {
            resolve({ status: 'ID não encontrado' })
          }
          resolve({ message: 'Pneu atualizado com sucesso!' })
        })
      })
    }
  }
}

module.exports = pneuInstaled
