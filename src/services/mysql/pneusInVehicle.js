const pneusInVehicle = (deps) => {
  return {
    save: (pneusInVehicle) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        const query = `
          INSERT INTO
          pneus_in_vehicles
          (vehicle, eixoDianteiroEsquerdo, eixoDianteiroDireito, primeiroEsquerdoExterno, 
            primeiroDireitoInterno, primeiroDireitoExterno, primeiroEsquerdoInterno, 
            segundoEsquerdoInterno, segundoEsquerdoExterno, sedundoDireitoInterno, 
            segundoDireitoExterno)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

        connection.query(query, [pneusInVehicle.vehicle, pneusInVehicle.eixoDianteiroEsquerdo,
          pneusInVehicle.eixoDianteiroDireito, pneusInVehicle.primeiroEsquerdoExterno,
          pneusInVehicle.primeiroDireitoInterno, pneusInVehicle.primeiroDireitoExterno,
          pneusInVehicle.primeiroEsquerdoInterno, pneusInVehicle.segundoEsquerdoInterno,
          pneusInVehicle.segundoEsquerdoExterno, pneusInVehicle.sedundoDireitoInterno,
          pneusInVehicle.segundoDireitoExterno], (error, results) => {
          if (error) {
            console.log(error)
            errorHandler(error, `Falha ao cadastrar pneus no veículo`, reject)
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
          id, vehicle, eixoDianteiroEsquerdo, eixoDianteiroDireito, primeiroEsquerdoExterno, 
          primeiroDireitoInterno, primeiroDireitoExterno, primeiroEsquerdoInterno, 
          segundoEsquerdoInterno, segundoEsquerdoExterno, sedundoDireitoInterno, 
          segundoDireitoExterno
          FROM pneus_in_vehicles`

        connection.query(query, (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar pneus neste veículos', reject)
            return false
          }
          resolve({status: 200, pneusInVehicles: results})
        })
      })
    },

    one: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        const query = `
          SELECT 
          id, vehicle, eixoDianteiroEsquerdo, eixoDianteiroDireito, primeiroEsquerdoExterno, 
          primeiroDireitoInterno, primeiroDireitoExterno, primeiroEsquerdoInterno, 
          segundoEsquerdoInterno, segundoEsquerdoExterno, sedundoDireitoInterno, 
          segundoDireitoExterno
          FROM pneus_in_vehicles WHERE id = ?`

        connection.query(query, id, (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar pneus neste veículos', reject)
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
          DELETE FROM pneus_in_vehicles WHERE id = ?`

        connection.query(query, [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao remover pneus neste veículos ${id}`, reject)
            return false
          }
          resolve({ message: 'Pneu removido com sucesso!', affectedRows: results.affectedRows })
        })
      })
    },

    update: (id, pneusInVehicle) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        const query = `
          UPDATE pneus_in_vehicles SET 
          vehicle = ?, eixoDianteiroEsquerdo = ?, eixoDianteiroDireito = ?, primeiroEsquerdoExterno = ?, 
          primeiroDireitoInterno = ?, primeiroDireitoExterno = ?, primeiroEsquerdoInterno = ?, 
          segundoEsquerdoInterno = ?, segundoEsquerdoExterno = ?, sedundoDireitoInterno = ?, 
          segundoDireitoExterno = ?
          WHERE id = ?`

        connection.query(query, [pneusInVehicle.vehicle, pneusInVehicle.eixoDianteiroEsquerdo,
          pneusInVehicle.eixoDianteiroDireito, pneusInVehicle.primeiroEsquerdoExterno,
          pneusInVehicle.primeiroDireitoInterno, pneusInVehicle.primeiroDireitoExterno,
          pneusInVehicle.primeiroEsquerdoInterno, pneusInVehicle.segundoEsquerdoInterno,
          pneusInVehicle.segundoEsquerdoExterno, pneusInVehicle.sedundoDireitoInterno,
          pneusInVehicle.segundoDireitoExterno, id], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao atualizar pneus`, reject)
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

module.exports = pneusInVehicle
