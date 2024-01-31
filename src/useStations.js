import { useState, useEffect } from "react";

const BASE_URL = "http://de1.api.radio-browser.info/json";

export function useStations(query, callback) {
    const [stations, setStations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(
        function () {
            const controller = new AbortController();
            async function fetchStations() {
                try {
                    setIsLoading(true);
                    setError("");
                    const res = await fetch(`${BASE_URL}/${query}`, {
                        signal: controller.signal,
                    });

                    if (!res.ok) {
                        throw new Error(
                            "Something went wrong with fetching movies"
                        );
                    }
                    const data = await res.json();
                    console.log(data);
                    if (data.Response === "False") {
                        throw new Error("Movie not found");
                    }

                    setStations(data);
                    setError("");
                } catch (error) {
                    console.error(error);
                    if (error.name !== "AbortError") {
                        setError(error.message);
                    }
                } finally {
                    setIsLoading(false);
                }
            }

            if (query.length < 3) {
                setMovies([]);
                setError("");
                return;
            }

            callback?.();
            fetchStations();
            return function () {
                controller.abort();
            };
        },
        /* eslint-disable */
        [query]
    );

    return { stations, isLoading, error };
}
