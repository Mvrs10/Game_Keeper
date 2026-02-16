import connectDB from "../server/config/db.js";

export default async (req: any, res: any) => {
    try {
        await connectDB();

        // This dynamic import is the ONLY way to bypass the ERR_REQUIRE_ESM error
        // because it works in both CommonJS and ESM environments.
        const { default: app } = await import("../server/app.js");

        return app(req, res);
    } catch (error: any) {
        console.error("Vercel Runtime Error:", error);
        res.status(500).json({ error: error.message });
    }
};