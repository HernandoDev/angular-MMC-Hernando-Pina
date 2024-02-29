export class StorageUtil {

  //Crea un item dentro del LocalStorage al recibir su key y su valor
  static setItem(key: string, value: any): void {
      localStorage.setItem(key, JSON.stringify(value));
  }

  //Obtiene un item dentro del LocalStorage al recibir su key
  static getItem(key: string): any {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
  }

  //Elimina un item dentro del localStorage al recibir su key
  static removeItem(key: string): void {
    localStorage.removeItem(key);
}
}
