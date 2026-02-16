export default async (req: any, res: any) => {
    try {
        // 1. DYNAMICALLY import the database connection
        const { default: connectDB } = await import("../server/config/db.js");
        await connectDB();

        // 2. DYNAMICALLY import the app
        const { default: app } = await import("../server/app.js");

        return app(req, res);
    } catch (error: any) {
        console.error("Vercel Runtime Error:", error);
        // Fallback for immediate visibility in browser
        if (!res.headersSent) {
            res.status(500).json({ 
                error: "Vercel Runtime Error", 
                message: error.message,
                stack: error.stack 
            });
        }
    }
};