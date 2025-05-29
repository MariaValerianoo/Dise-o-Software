class Llanta {
  constructor() {
    this.llantas = [
      { id: 1, marca: 'Michelin', medida: '195/65R15', precio: 250 },
      { id: 2, marca: 'Bridgestone', medida: '205/55R16', precio: 200 }
    ];
  }

  getAll() {
    return this.llantas;
  }

  getById(id) {
    return this.llantas.find(llanta => llanta.id === id);
  }

  create(llantaData) {
    const nuevaLlanta = { id: this.llantas.length + 1, ...llantaData };
    this.llantas.push(nuevaLlanta);
    return nuevaLlanta;
  }

  update(id, updatedData) {
    const index = this.llantas.findIndex(llanta => llanta.id === id);
    if (index === -1) return null;
    this.llantas[index] = { ...this.llantas[index], ...updatedData };
    return this.llantas[index];
  }

  delete(id) {
    const index = this.llantas.findIndex(llanta => llanta.id === id);
    if (index === -1) return false;
    this.llantas.splice(index, 1);
    return true;
  }
}

export default Llanta;