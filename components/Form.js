import useSWR from "swr";

export default function PlaceForm() {
    const { mutate } = useSWR("/api/places");

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const placeData = Object.fromEntries(formData);

        const response = await fetch("/api/places", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(placeData),
        });

        if (response.ok) {
            mutate();
        }

        return (
            
        )
    }
}