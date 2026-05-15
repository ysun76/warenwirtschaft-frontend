import api from '../lib/api';
import { useState, useEffect } from 'react';

interface Produkt {
  id: number;
  name: string;
  preis: number;
  kategorie: string;
  istVerfuegbar: boolean;
}

function ProduktListe() {
  const [produkte, setProdukte] = useState<Produkt[]>([]);
  const [laedt, setLaedt] = useState<boolean>(true);
  const [fehler, setFehler] = useState<string | null>(null);

  useEffect(() => {
    const produkteLaden = async () => {
      try {
        // 1. 使用 axios 实例发起请求
        const response = await api.get<Produkt[]>('/api/products');
        
        // 2. 🌟 Axios 直接把解析好的数据放在 .data 中
        // 不需要 response.ok，不需要 await response.json()
        const daten = response.data;
        
        // 3. 更新状态
        setProdukte(daten);
        
      } catch (err) {
        // Axios 报错会自动进到 catch 块
        setFehler(err instanceof Error ? err.message : 'Unbekannter Fehler');
      } finally {
        setLaedt(false);
      }
    };

    produkteLaden();
  }, []);

  if (laedt) return <p>Lade Produkte...</p>;
  if (fehler) return <p style={{ color: 'red' }}>Fehler: {fehler}</p>;

  return (
    <ul>
      {produkte.map(p => (
        <li key={p.id}>{p.name} – €{p.preis.toFixed(2)}</li>
      ))}
    </ul>
  );
}

export default ProduktListe;