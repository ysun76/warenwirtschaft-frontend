// api.ts – typsichere API-Funktionen
import api from '../lib/api';
interface Produkt {
  id: number;
  name: string;
  preis: number;
  kategorie: string;
  istVerfuegbar: boolean;
}
type NeuesProdukt = Omit<Produkt, 'id'>;  // Kein 'id' beim Erstellen
export const produkteApi = {
  // Alle Produkte laden
  getAll: async (): Promise<Produkt[]> => {
    const res = await api.get<Produkt[]>('/api/products');
    return res.data;
  },
// Ein Produkt laden
  getById: async (id: number): Promise<Produkt> => {
    const res = await api.get<Produkt>(`/api/products/${id}`);
    return res.data;
  },
// Neues Produkt erstellen
  create: async (produkt: NeuesProdukt): Promise<Produkt> => {
    const res = await api.post<Produkt>('/api/products', produkt);
    return res.data;
  },
// Produkt aktualisieren
  update: async (id: number, daten: Partial<Produkt>): Promise<Produkt> => {
    const res = await api.put<Produkt>(`/api/products/${id}`, daten);
    return res.data;
  },
// Produkt löschen
  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/products/${id}`);
  },
};

