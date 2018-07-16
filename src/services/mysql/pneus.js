const pneu = (deps) => {
  return {
    save: (pneu) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        const query = `
          INSERT INTO
          pneus
          (dimension, brand, pr, type, number, registry, new, recachutado)
          VALUES (?, ? , ?, ?, ?, ?, ?, ?)`

        connection.query(query, [pneu.dimension, pneu.brand, pneu.pr, pneu.type,
          pneu.number, pneu.registry,
          pneu.new, pneu.recachutado], (error, results) => {
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
          id, dimension, brand, pr, type, number, registry, new, recachutado 
          FROM pneus`

        connection.query(query, (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar pneus', reject)
            return false
          }
          resolve({status: 200, pneus: results})
        })
      })
    },

    one: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        const query = `
          SELECT 
          id, dimension, brand, pr, type, number, registry, new, recachutado 
          FROM pneus WHERE id = ?`

        connection.query(query, id, (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar pneu', reject)
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
          DELETE FROM pneus WHERE id = ?`

        connection.query(query, [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao remover o pneu de id ${id}`, reject)
            return false
          }
          resolve({ message: 'Pneu removido com sucesso!', affectedRows: results.affectedRows })
        })
      })
    },

    update: (id, pneu) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        const query = `
          UPDATE pneus SET 
          dimension = ?, brand = ?, pr = ?, type = ?, number = ?, registry = ?, new = ?, recachutado = ?
          WHERE id = ?`

        connection.query(query, [pneu.dimension, pneu.brand, pneu.pr, pneu.type, pneu.number, pneu.registry, pneu.new, pneu.recachutado, id], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao atualizar pneu`, reject)
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

module.exports = pneu
