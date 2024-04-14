

"use server"
export const registerAuth = async (formData) => {

    try {
        const res = await fetch(`${process.env.WEBSITE_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        return res.json()

    } catch (error) {
        console.error("Error in registerHandler:", error);
        throw error;
    }
};