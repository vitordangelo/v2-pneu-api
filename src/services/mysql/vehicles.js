const vehicle = (deps) => {
  return {
    save: (vehicle) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        const query = `
          INSERT INTO
          vehicles
          (number_car)
          VALUES (?)`

        connection.query(query, [vehicle.number_car], (error, results) => {
          if (error) {
            console.log(error)
            errorHandler(error, `Falha ao cadastrar veículo`, reject)
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
          id, number_car 
          FROM vehicles`

        connection.query(query, (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar veículo', reject)
            return false
          }
          resolve({status: 200, vehicles: results})
        })
      })
    },

    one: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        const query = `
          SELECT 
          id, number_car 
          FROM vehicles WHERE id = ?`

        connection.query(query, id, (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar veículo', reject)
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
          DELETE FROM vehicles WHERE id = ?`

        connection.query(query, [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao remover o veículo de id ${id}`, reject)
            return false
          }
          resolve({ message: 'Veículo removido com sucesso!', affectedRows: results.affectedRows })
        })
      })
    },

    update: (id, vehicle) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        const query = `UPDATE vehicles SET number_car = ? WHERE id = ?`

        connection.query(query, [vehicle.number_car, id], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao atualizar veículo`, reject)
            return false
          }
          if (results.affectedRows === 0) {
            resolve({ status: 'ID não encontrado' })
          }
          resolve({ message: 'Veículo atualizado com sucesso!' })
        })
      })
    }

  }
}

module.exports = vehicle
