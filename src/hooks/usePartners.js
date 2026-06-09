import { useEffect, useState } from "react";

import { getPartners } from "../api/partnerApi";

export default function usePartners() {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadPartners() {
      try {
        const partnersData = await getPartners();

        if (!ignore) {
          setPartners(partnersData);
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Errore durante il caricamento dei partner.");
          setPartners([]);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadPartners();

    return () => {
      ignore = true;
    };
  }, []);

  return { partners, isLoading, error };
}
