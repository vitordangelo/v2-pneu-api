const historyPneus = (deps) => {
  return {
    save: (historyPneus) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        const query = `
          INSERT INTO
          historyPneuss
          (dimension, brand, pr, type, number, registry, new, recachutado)
          VALUES (?, ? , ?, ?, ?, ?, ?, ?)`

        connection.query(query, [historyPneus.dimension, historyPneus.brand, historyPneus.pr, historyPneus.type,
          historyPneus.number, historyPneus.registry,
          historyPneus.new, historyPneus.recachutado], (error, results) => {
          if (error) {
            console.log(error)
            errorHandler(error, `Falha ao cadastrar historyPneus`, reject)
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
          id, dimension, brand, pr, type, number, registry, new, recachutado 
          FROM historyPneuss`

        connection.query(query, (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar historyPneuss', reject)
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
          id, dimension, brand, pr, type, number, registry, new, recachutado 
          FROM historyPneuss WHERE id = ?`

        connection.query(query, id, (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar historyPneus', reject)
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
          DELETE FROM historyPneuss WHERE id = ?`

        connection.query(query, [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao remover o historyPneus de id ${id}`, reject)
            return false
          }
          resolve({ message: 'Pneu removido com sucesso!', affectedRows: results.affectedRows })
        })
      })
    },

    update: (id, historyPneus) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        const query = `
          UPDATE historyPneuss SET 
          dimension = ?, brand = ?, pr = ?, type = ?, number = ?, registry = ?, new = ?, recachutado = ?
          WHERE id = ?`

        connection.query(query, [historyPneus.dimension, historyPneus.brand, historyPneus.pr, historyPneus.type, historyPneus.number, historyPneus.registry, historyPneus.new, historyPneus.recachutado, id], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao atualizar historyPneus`, reject)
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

module.exports = historyPneus
