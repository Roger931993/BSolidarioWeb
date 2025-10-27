// import { Injectable, NgModule } from '@angular/core';
import { format as formatDateFns } from 'date-fns';

// @Injectable({
//   providedIn: 'root',
// })
export class FunctionDates {
  constructor() {}

  canCallBack(date: Date | null, timeout): boolean {
    // Verificar si ha pasado el tiempo de espera desde la última llamada
    return !date || Date.now() - date.getDate() >= timeout;
  }

  static addBusinessDays(
    startDate: Date,
    daysToAdd: number
  ): { endDate: Date; totalDays: number } {
    let currentDate = new Date(startDate);
    let addedDays = 0;
    let totalDays = 0;

    while (addedDays < daysToAdd) {
      currentDate.setDate(currentDate.getDate() + 1); // Avanzar un día
      totalDays++; // Contar todos los días

      const dayOfWeek = currentDate.getDay(); // Obtener el día de la semana

      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        // Contar solo si no es sábado (6) ni domingo (0)
        addedDays++;
      }
    }

    return { endDate: currentDate, totalDays };
  }

  /**
   * Resta días hábiles a una fecha.
   * @param startDate Fecha inicial
   * @param days Número de días laborables a restar
   * @returns Nueva fecha con los días hábiles restados
   */
  static subtractBusinessDays(
    startDate: Date,
    days: number
  ): { date: Date; totalDays: number } {
    let resultDate = new Date(startDate);
    let count = 0;
    let totalDays = 0;

    while (count < days) {
      resultDate.setDate(resultDate.getDate() - 1);
      totalDays++;
      // Si no es sábado (6) ni domingo (0), cuenta el día
      if (resultDate.getDay() !== 0 && resultDate.getDay() !== 6) {
        count++;
      }
    }

    return { date: resultDate, totalDays };
  }

  /**
   * Calcula la diferencia en días entre dos fechas.
   * @param startDate Fecha de inicio
   * @param endDate Fecha de fin
   * @returns Número total de días entre ambas fechas
   */
  static getDaysBetweenDates(startDate: Date, endDate: Date): number {
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convertir ms a días

    return diffDays <= 0 ? 0 : diffDays;
  }

  /**
   * Devuelve todas las semanas del año con fecha de inicio y fin.
   * @param year Año a calcular
   * @returns Array con las semanas { startDate, endDate }
   */
  static getWeeksOfYear(year: number): { startDate: Date; endDate: Date }[] {
    const weeks = [];
    let currentDate = new Date(year, 0, 1); // 1 de enero
    let startDate = this.getStartOfWeek(currentDate);

    while (startDate.getFullYear() <= year) {
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6); // Fin de la semana

      weeks.push({
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });

      // Mueve la fecha a la siguiente semana
      startDate.setDate(startDate.getDate() + 7);
    }

    return weeks;
  }

  /**
   * Obtiene el primer día de la semana (lunes)
   * @param date Fecha de referencia
   * @returns Fecha de inicio de semana
   */
  static getStartOfWeek(date: Date): Date {
    const day = date.getDay(); // 0 = Domingo, 1 = Lunes...
    const diff = day === 0 ? -6 : 1 - day; // Si es domingo, restamos 6 días
    const startDate = new Date(date);
    startDate.setDate(date.getDate() + diff);
    return startDate;
  }

  /**
   * Verifica si una fecha está dentro de un rango de fechas (inclusive).
   * @param date Fecha a validar
   * @param startDate Fecha de inicio
   * @param endDate Fecha de fin
   * @returns True si la fecha está en el rango, False si no
   */
  static isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
    const targetDate = date.getTime();
    const start = startDate.getTime();
    const end = endDate.getTime();

    return targetDate >= start && targetDate <= end;
  }

  static setDateFormat(date: Date, format: string): string {
    // Aquí podrías implementar la lógica para establecer el formato de fecha
    // Por ejemplo, podrías usar una librería como date-fns o moment.js
    // console.log(`Formato de fecha establecido a: ${format}`);

    return formatDateFns(date, format);
  }
}
