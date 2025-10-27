import { StatusEnum } from "@web/core/models/status.enum";

export interface StatusModel {
  id: number;
  name: string;
  description: string;
  class: string;
  status: number;
  icon: string;
}

const StatusData: StatusModel[] = [
  {
    id: StatusEnum.Disenio,
    name: "Diseño",
    description: "Proyectos en Diseño",
    class: "info",
    icon: "bx bx-customize",
    status: 1,
  },
  {
    id: StatusEnum.Kickoff,
    name: "Kickoff",
    description: "Proyectos en Kickoff",
    class: "secondary",
    icon: "bx bx-user-voice",
    status: 1,
  },
  {
    id: StatusEnum.PlanificacionImplementacion,
    name: "Planificación / Implementación",
    description: "Proyectos en Planificación / Implementación",
    class: "success",
    icon: "bx bx-list-ol",
    status: 1,
  },
  {
    id: StatusEnum.TransicionCierre,
    name: "Transición al Cierre",
    description: "Proyectos en transición al Cierre",
    class: "warning",
    icon: "bx bx-walk",
    status: 1,
  },
  {
    id: StatusEnum.PostProyect,
    name: "Post Proyecto",
    description: "Post Proyecto",
    class: "warning",
    icon: "bx bx-check-shield",
    status: 1,
  },
  {
    id: StatusEnum.Cerrados,
    name: "Cerrado",
    description: "Proyectos Cerrados",
    class: "danger",
    icon: "bx bx-x",
    status: 1,
  },
];

const StatusGeneral: StatusModel[] = [
  {
    id: StatusEnum.Activo,
    name: "Activo",
    description: "Activo",
    class: "info",
    icon: "bx bx-customize",
    status: 1,
  },
  {
    id: StatusEnum.Inactivo,
    name: "Inactivo",
    description: "Inactivo",
    class: "info",
    icon: "bx bx-user-voice",
    status: 1,
  },
];

const StatusGeneralAll: StatusModel[] = [
  {
    id: StatusEnum.Activo,
    name: "Activo",
    description: "Activo",
    class: "success",
    icon: "bx bx-customize",
    status: 1,
  },
  {
    id: StatusEnum.Inactivo,
    name: "Inactivo",
    description: "Inactivo",
    class: "secondary",
    icon: "bx bx-user-voice",
    status: 1,
  },
  {
    id: StatusEnum.Disenio,
    name: "Diseño",
    description: "Proyectos en Diseño",
    class: "info",
    icon: "bx bx-customize",
    status: 1,
  },
  {
    id: StatusEnum.Kickoff,
    name: "Kickoff",
    description: "Proyectos en Kickoff",
    class: "secondary",
    icon: "bx bx-user-voice",
    status: 1,
  },
  {
    id: StatusEnum.PlanificacionImplementacion,
    name: "Planificación / Implementación",
    description: "Proyectos en Planificación / Implementación",
    class: "success",
    icon: "bx bx-list-ol",
    status: 1,
  },
  {
    id: StatusEnum.TransicionCierre,
    name: "Transición al Cierre",
    description: "Proyectos en transición al Cierre",
    class: "warning",
    icon: "bx bx-walk",
    status: 1,
  },
  {
    id: StatusEnum.PostProyect,
    name: "Post Proyectos",
    description: "Post Proyectos",
    class: "warning",
    icon: "bx bx-check-shield",
    status: 1,
  },
  {
    id: StatusEnum.Cerrados,
    name: "Cerrados",
    description: "Proyectos Cerrados",
    class: "danger",
    icon: "bx bx-x",
    status: 1,
  },
  {
    id: StatusEnum.Enconversacion,
    name: "En Conversaciones",
    description: "En Conversaciones",
    class: "danger",
    icon: "bx bx-x",
    status: 1,
  },
];

const StatusResultFramework: StatusModel[] = [
  {
    id: StatusEnum.Planificacion,
    name: "Planificación",
    description: "Planificación",
    class: "info",
    icon: "bx bx-customize",
    status: 1,
  },
  {
    id: StatusEnum.Ejecucion,
    name: "Ejecución",
    description: "Ejecución",
    class: "warning",
    icon: "bx bx-user-voice",
    status: 1,
  },
  {
    id: StatusEnum.Completado,
    name: "Completado",
    description: "Completado",
    class: "success",
    icon: "bx bx-list-ol",
    status: 1,
  },
  {
    id: StatusEnum.Anulado,
    name: "Anulado",
    description: "Anulado",
    class: "danger",
    icon: "bx bx-walk",
    status: 1,
  },
  {
    id: StatusEnum.Activo,
    name: "Cargado",
    description: "Cargado",
    class: "secondary",
    icon: "bx bx-customize",
    status: 1,
  },
  {
    id: StatusEnum.Inactivo,
    name: "Inactivo",
    description: "Inactivo",
    class: "danger",
    icon: "bx bx-user-voice",
    status: 1,
  },
];

export { StatusData, StatusGeneral, StatusGeneralAll, StatusResultFramework };
