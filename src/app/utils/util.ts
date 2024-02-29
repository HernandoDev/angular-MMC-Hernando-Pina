import { StorageUtil } from '../utils/storage.utils';

export class Util {

  //Comprueba si los datos almacenados pertenece a un usuario admin
  static isAdmin(): boolean {
    const user = StorageUtil.getItem('user');
    return user && user.role.id === 1;
  }

  //Comprueba si los datos almacenados pertenece a un usuario customer
  static isUser(): boolean {
    const user = StorageUtil.getItem('user');
    return user && user.role.id === 2;
  }
}
