// 1. Importamos la instancia de supabase que configuraste en tu proyecto
import { supabase } from "./supabaseClient";

// 2. Definimos la estructura (Interface) de tus noticias. 
// Esto ayuda a que el editor te avise si escribes mal un nombre (ej: 'tituloo' en vez de 'titulo')
export interface News {
  id: number;      // El identificador único de la noticia
  titulo: string;  // El titular de la noticia
  contenido: string; // El cuerpo del texto
  autor: string;   // Quién escribió la noticia
  vistas: number;  // Contador de visualizaciones
}

/**
 * Función para obtener todas las noticias desde la base de datos de Supabase.
 * Retorna una Promesa que eventualmente será un array de objetos tipo News.
 */
export const getNews = async (): Promise<News[]> => {
  // 3. Hacemos la consulta a la tabla "News"
  // .from('News') -> Indica el nombre exacto de la tabla en Supabase
  // .select('*')  -> Trae todas las columnas disponibles
  const { data, error } = await supabase
    .from("News")
    .select("*");

  // 4. Control de errores: Si Supabase responde con un error (ej: fallo de red)
  if (error) {
    console.error("Error al obtener las noticias de Supabase:", error.message);
    // Retornamos un array vacío para que la aplicación no se rompa al intentar hacer un .map()
    return [];
  }

  // 5. Verificamos si data existe. Si es nulo, retornamos array vacío.
  if (!data) return [];

  // 6. Retornamos los datos y le decimos a TS que confíe en que tienen el formato 'News'
  return data as News[];
};